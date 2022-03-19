const express = require('express');
const router = express.Router();
const webpushController = require('../controller/webpush')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getToken', webpushController.getToken);

router.get('/setToken', webpushController.setToken);

module.exports = router;
