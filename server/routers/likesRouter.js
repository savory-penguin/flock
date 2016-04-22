var likesRouter = require('express').Router();
var likesController = require('../controllers/likesController.js');

likesRouter.route('/').post(likesController.updateLikes);

module.exports = likesRouter;
