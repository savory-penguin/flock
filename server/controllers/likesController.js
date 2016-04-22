var util = require('util');
var mongoose = require('mongoose');
var Video = require('../models/videoModel.js');
var logger = require('../config/logger.js');
var formidable = require('formidable');

exports.updateLikes = function(request, response) {
  var filename = request.body.filename;
  var newLikes = request.body.likes;
  Video.update({ filename: filename }, { likes: newLikes }, function(error, document) {
    if (error) {
      console.log('Error updating likes', error);
      respponse.status(500).send();
    } else {
      console.log('Successfully updated likes for', document);
      response.status(201).send();
    }
  });
};
