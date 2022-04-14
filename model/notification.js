
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// Define our model
const androidTOkenSchema = new Schema({
    token: String
});


// Create the model class
module.exports =  mongoose.model('android_token', androidTOkenSchema);