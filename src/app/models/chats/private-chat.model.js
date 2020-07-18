'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Message = require('../message.model');

var Schema = schema({
  name:String,
  image:String,
  from:String,
  to:String,
  messages:[Message.schema]
});

module.exports = mongoose.model('PrivateChat',Schema);