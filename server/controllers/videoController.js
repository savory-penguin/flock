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
createVideosFromData();

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
      lat: fields.lat,
      long: fields.long,
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