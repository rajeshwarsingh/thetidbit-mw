const express = require('express');
const router = express.Router();
const webpushController = require('../controller/webpush')
const MailController = require('../controller/mail')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getToken', webpushController.getToken);

router.get('/setToken', webpushController.setToken);

router.post('/sentEmail', MailController.sentEmail);



module.exports = router;
