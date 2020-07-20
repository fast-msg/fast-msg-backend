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

Schema.virtual('id').get(function() { return this._id; });

module.exports = mongoose.model('LiveChat',Schema);