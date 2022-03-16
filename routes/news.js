var express = require('express');
var router = express.Router();
const rapidapiControlle = require('../controller/rapidapi')
const newsapiControlle = require('../controller/rapidapi')
const config = require('../config')
const { apiProvide } = config

if (apiProvide === 'newsapi') {
    router.get('/getCategoryNews', newsapiControlle.getCategoryNews);
    router.get('/getSearchedNews', newsapiControlle.getSearchedNews);
    router.get('/getTrendingNews',newsapiControlle. getTrendingNews);
} else {
    router.get('/getCategoryNews', rapidapiControlle.getCategoryNews);
    router.get('/getSearchedNews', rapidapiControlle.getSearchedNews);
    router.get('/getTrendingNews',rapidapiControlle. getTrendingNews);
}


module.exports = router;
