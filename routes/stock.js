var express = require('express');
var router = express.Router();
const stockapiControlle = require('../controller/stock')
const config = require('../config')
const { apiProvide } = config

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
router.get('/update', stockapiControlle.getStockUpdate);


module.exports = router;
