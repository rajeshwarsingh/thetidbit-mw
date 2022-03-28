var express = require('express');
var router = express.Router();
const rapidapiControlle = require('../controller/rapidapi')
const newsapiControlle = require('../controller/newsapi')
const config = require('../config')
const { apiProvide } = config

if (apiProvide === 'newsapi') {
    console.log("check ***1")
    router.get('/getCategoryNews', newsapiControlle.getCategoryNews);
    router.get('/getSearchedNews', newsapiControlle.getSearchedNews);
    router.get('/getTrendingNews',newsapiControlle. getTrendingNews);
} else {
    console.log("check ***2")
    router.get('/getCategoryNews', rapidapiControlle.getCategoryNews);
    router.get('/getSearchedNews', rapidapiControlle.getSearchedNews);
    router.get('/getTrendingNews',rapidapiControlle. getTrendingNews);
}


module.exports = router;
