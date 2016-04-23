var fs = require('fs');
var util = require('util');
var mongoose = require('mongoose');
var Video = require('../models/videoModel.js');
var sampleVideoData = require('../data/sampleVideoData.js');
var logger = require('../config/logger.js');
var formidable = require('formidable');


/*
   This function will load sample data 
   for us to use, we would comment out 
   execution of it if in production.

*/
var createVideosFromData = function() {
 
  // delete all data first so we don't have dupes
  // everytime server is bounced and db isn't
  Video.remove({}, function(err, removed) {
    if (err) {
      return logger.error('Error removing Videos: ' + err);
    }

    logger.info('Removed Videos: ' + removed);

  });

  sampleVideoData.forEach(function(video) {
    Video.create(video, function(err, newVideo) {
      if (err) {
        return logger.error('Error creating Video: ' + newVideo + ', error: ' + err);
      } 
        
      logger.info('Created sample Video: ' + newVideo);
    
    });
  });

}; 

/*
   Comment this out for prod.  It will attempt to
   generate new Videos every time server is bounced.
   It will delete all data in the db, if this is
   not wanted, comment out this call. 
*/
// createVideosFromData();

// Function to calculate distance from longitude and latitude
// No need to export

var getDistanceFromLatLonInM = function(lat1,lon1,lat2,lon2) {
  var deg2rad = function(deg) {
    return deg * (Math.PI/180);
  };

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d * 1000; // Return distance in meters
};

exports.getAllVideo = function(req, res) {
  logger.info('HEY PAY ATTENTION');
  logger.info(req.headers);

  // Video.find({}, function(err, videos) {
  //   if (err) {
  //     logger.error('ERROR in getAllVideo: ', err);
  //     return res.json(err);
  //   } 
      
  //   logger.info('Successfully retrieved Videos: ' + videos);
  //   logger.info('req.body was: ' + JSON.stringify(req.body));
  //   res.json(videos); 
  // });

  // Video.find({
  //   $where: function(){ return (getDistanceFromLatLonInM(this.lat, this.long, req.headers.lat, req.headers.long) < 500); } 
  // })
  //   .exec(function(err, videos) {
  //     if (err) {
  //       logger.error('ERROR in getAllVideo: ', err);
  //       return res.json(err);
  //     } 
        
  //     logger.info('Successfully retrieved Videos: ' + videos);
  //     res.json(videos); 
  //   });

  var limit = 25;
  var maxDistance = 10; // in kilometers
  maxDistance /= 100; // there are approx 100 kilometers in a degree of lat or long
  // maxDistance /= 6371; // converting to radians, this is some stack overflow nonsense that does not work

  var coords = [];
  coords[0] = req.headers.long;
  coords[1] = req.headers.lat;
  startTime = parseInt(req.headers.picked) - 43200000 || (new Date()).getTime();
  Video.find({
    loc: {
      $near: coords,
      $maxDistance: maxDistance
    },
    createdAt: {
      "$gte": startTime
    }
  }).limit(limit)
    .exec(function(err, locations) {
      if (err) {
        logger.error(err);
        return res.json(500, err);
      }
      
      res.json(200, locations);
    });

  // BELOW does not quite work for some reason, but worth keeping around in case above turns out to be wrong.

  // var point = {type: "Point", coordinates: coords};

  // var options = {
  //   num: limit,
  //   distanceMultiplier: (6371 * Math.PI / 180.0),
  //   maxDistance: maxDistance,
  //   spherical: true
  // };

  // Video.geoNear(coords, options, function(err, locations, stats) {
  //   if (err) {
  //     logger.error(err);
  //     return res.json(500, err);
  //   }
    
  //   logger.info('locations are:', locations);
  //   res.json(200, locations);
  // });

};

exports.saveVideo = function(req, res) {

  logger.info('working on it');
  var form = new formidable.IncomingForm();
  form.uploadDir = "./server/uploads";
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    logger.info('parsing form');
    var fileName = files.file.path.replace('server/uploads/', '');

    var newVideo = {
      filename: fileName,
      loc: [fields.long, fields.lat], // longitude always comes first
      type: fields.type,
      description: fields.description,
      title: fields.title,
    };

    Video.create(newVideo, function(err, newVideo) {
      if (err) {
        logger.error('in newVideo save ', err);
        res.status(400);
        return res.json(err);
      } 

      logger.info('Video successfully created: ' + newVideo);

      res.writeHead(201, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
  });
};
