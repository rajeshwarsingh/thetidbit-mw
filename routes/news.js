var express = require('express');
var router = express.Router();
const newsControlle = require('../controller/rapidapi')
const config = require('../config')
const { apiProvide } = config
const { getCategoryNews, getSearchedNews, getTrendingNews } = newsControlle

if (apiProvide === 'newsapi') {
    router.get('/getCategoryNews', getCategoryNews);
    router.get('/getSearchedNews', getSearchedNews);
    router.get('/getTrendingNews', getTrendingNews);
} else {
    router.get('/getCategoryNews', getCategoryNews);
    router.get('/getSearchedNews', getSearchedNews);
    router.get('/getTrendingNews', getTrendingNews);
}


module.exports = router;
