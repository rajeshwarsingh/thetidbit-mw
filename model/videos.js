
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// Define our model
const videosSchema = new Schema({
    img: String,
    title: String,
    url: String,
    code: String,
    description: String,
    tags: [String],
    category: String,
    
});


// Create the model class
module.exports =  mongoose.model('videos', videosSchema);