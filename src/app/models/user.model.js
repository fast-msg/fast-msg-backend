'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

var Schema = schema({
    name:String,
    email:String,
    password:String,
    status:Number,
    image:String,
    contacts:[String],
    privateChats:[String],
    groupChats:[String],
    settings:{
        theme:String
    }
});

//---------STATUS----------------
//1 - active
//2 - desactivate
//3 - congelate

module.exports = mongoose.model('User',Schema);