
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// Define our model
const commentsBlogs = new Schema({
    commentId: String,
    blogId: String,
    user: String,
    comment: String,
    reply: String,
    reply: [{ replyId: String, reply: String, user:String, datetime:Date }],
    datetime: Date,
    category:String
    
});


// Create the model class
module.exports =  mongoose.model('comments', commentsBlogs);