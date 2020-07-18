'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Message = require('./message.model');

var Schema = schema({
  type:Number,
  members:[String],
  messages:[Message.schema]
});

//-----------type
//0 - privado
//1 - grupal 
//2 - live-chat

module.exports = mongoose.model('Chat',Schema);