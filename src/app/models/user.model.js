'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

var Schema = schema({
    name:String,
    gender:Number,
    dateBirth:Date,
    email:String,
    password:String,
    status:Number,
    image:String,
    contacts:[String],
    chats:[String],
    settings:{
        theme:String
    }
});

//---------STATUS----------------
//1 - active
//2 - desactivate
//3 - congelate

module.exports = mongoose.model('User',Schema);