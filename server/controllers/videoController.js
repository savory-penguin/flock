var mongoose = require('mongoose');
var Video = require('../models/videoModel.js');
var sampleData = require('../data/samplePOIData.js');
var logger = require('../config/logger.js');

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

  sampleData.forEach(function(video) {
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

exports.saveVideo = function(req, res) {
  logger.info('Video to create: ' + req.body);

  var newVideo = req.body;

  Video.create(newVideo, function(err, newVideo) {
    if (err) {
      logger.error('in newVideo save ', err);
      res.status(400);
      return res.json(err);
    } 

    logger.info('Video successfully created: ' + newVideo);

    res.status(201);
    res.json(newVideo);
  });
};


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
