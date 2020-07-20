'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

var Schema = schema({
    content: String,
    date: Date,
    owner:String
});  

Schema.virtual('id').get(function() { return this._id; });

module.exports = mongoose.model('Message', Schema);