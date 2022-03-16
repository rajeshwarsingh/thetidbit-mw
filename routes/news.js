var express = require('express');
var router = express.Router();
const newsControlle = require('../controller/news')
const { getCategoryNews, getSearchedNews, getTrendingNews } = newsControlle

/* GET users listing. */
router.get('/getCategoryNews', getCategoryNews);
router.get('/getSearchedNews', getSearchedNews);
router.get('/getTrendingNews', getTrendingNews);

module.exports = router;
