var express = require('express');
var router = express.Router();

const blogsControlle = require('../controller/blogs')

router.get('/blogByCategory/:id',blogsControlle.getBlogs);

router.get('/comments/:id',blogsControlle.getComments);
router.post('/comments',blogsControlle.createComment);
router.put('/comments',blogsControlle.updateComment);

router.get('/blogById/:id',blogsControlle.getBlogById);

router.get('/getFeaturedBlogs',blogsControlle.getFeaturedBlogs);

router.get('/getTipsBlogs',blogsControlle.getTipsBlogs);

module.exports = router;