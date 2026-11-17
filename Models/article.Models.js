const { required } = require('joi');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
        minLength: 3
    },
    
    Content:{
        type:String,
        required: true,
        minLength: 20
    },

     Author:{
        type:String,
        default: 'Guest',
        minLength: 2
    }

},{timestamps: true});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article; 