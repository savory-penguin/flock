var fs = require('fs');
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

exports.getAllVideo = function(req, res) {

  Video.find({}, function(err, videos) {
    if (err) {
      logger.error('ERROR in getAllVideo: ', err);
      return res.json(err);
    } 
      
    logger.info('Successfully retrieved Videos: ' + videos);
    res.json(videos); 
  });
};

exports.getVideo = function(req, res) {
  db.getUsers(username)
    .then(function(users) {
      console.log(users[0]);
      var file  = users[0].profileImage;
      var options = {
        'Content-Type': 'video/mp4',
        'root': __dirname + '/../uploads/' // directory which houses images
      };

      res.sendFile(file, options, function(err) {
        if (err) {
          console.error(err);
          res.status(400).send();
        }
        else {
          console.log('Sent:', file);
        }
      });
      
    })
    .catch(function(error) {
      console.log('There was an error calling db.getUsers from getProfilePhoto for user: ' + username, error);
      res.status(500).send();
    });
};

exports.saveVideo = function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./server/uploads";
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {
    // Associate files.photo.path [location of img on FS] with the appropriate user in database
    // var username = fields.username.toLowerCase();
    var fileName = files.video.path.replace('server/uploads/', '');
    var lat = fields.lat;
    var long = fields.long;
    var type = fields.type;
    var description = fields.description;
    var title = fields.title;

    var newVideo = {
      filename: fileName,
      lat: lat,
      long: long,
      type: type,
      description: description,
      title: title,
    };

    Video.create(newVideo, function(err, newVideo) {
      if (err) {
        logger.error('in newVideo save ', err);
        res.status(400);
        return res.json(err);
      } 

      logger.info('Video successfully created: ' + newVideo);

      res.status(201);
    });
  });
};