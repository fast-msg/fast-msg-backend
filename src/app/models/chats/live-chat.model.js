'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

var Schema = schema({
  members:[String],
  name:String,
  image:String,
  startDate:Date,
  finishDate:Date
});

module.exports = mongoose.model('LiveChat',Schema);