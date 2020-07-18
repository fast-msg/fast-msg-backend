'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

var Schema = schema({
    content: String,
    date: Date,
    owner:String
});  
module.exports = mongoose.model('Message', Schema);