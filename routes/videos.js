var express = require('express');
var router = express.Router();

const videosController = require('../controller/videos')

router.get('/',videosController.getVideos);
router.get('/setVideos',videosController.setVideos);

module.exports = router;