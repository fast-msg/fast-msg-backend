'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;
var Message = require('./message.model');

var Schema = schema({
  type:Number,
  members:[Number],
  messages:[Message]
});

//-----------type
//0 - privado
//1 - grupal 
//2 - live-chat

module.exports = mongoose.model('Chat',Schema);