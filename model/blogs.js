
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// Define our model
const androidTOkenSchema = new Schema({
    homeImg: String,
    homeTitle: String,
    title: String,
    titleImg: String,
    author: {
        name:String,
        date:Date,
        readTime:String,
        img:String
    },
    summery: String,
    paragraph: Schema.Types.Mixed,
    conclution: String,
    tags: [String],
    category: String,
    
});


// Create the model class
module.exports =  mongoose.model('blogs', androidTOkenSchema);