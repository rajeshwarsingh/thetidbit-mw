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
router.post('/sendPushNotiAndroid', webpushController.sendWPToAndroid);
router.post('/sendWPToWeb', webpushController.sendWPToWeb);

router.post('/sentEmail', MailController.sentEmail);
router.get('/sentBlogSubscribe/:id', MailController.sentBlogSubscribeEmail);
router.post('/sentFeedbackEmail', MailController.sentFeedbackEmail);

router.get('/share',(req, res)=>{

  return res.redirect('intent:#Intent;scheme=thetidbit://?source=hello;package=com.mobileappthetidbit;end')
});



module.exports = router;
