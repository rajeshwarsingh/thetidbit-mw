var express = require('express');
var router = express.Router();
const stockapiControlle = require('../controller/stock')
const config = require('../config')
const { apiProvide } = config

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
router.get('/update', stockapiControlle.getStockUpdate);

router.get('/setMindex', stockapiControlle.setMIndex);
router.get('/getMindex', stockapiControlle.getMIndex);

module.exports = router;
