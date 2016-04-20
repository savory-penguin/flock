var videoRouter = require('express').Router();
var videoController = require('../controllers/videoController.js');

// Declare all routes for videos and specify what controller method we're going to use for each

// the path '/api/videos' is already prepended to all routes based on app.use statement in server.js
videoRouter.route('/').get(videoController.getAllVideo);
videoRouter.route('/').post(videoController.saveVideo);

module.exports = videoRouter;
