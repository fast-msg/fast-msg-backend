'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Message = require('../message.model');

var Schema = schema({
  members:[String],
  messages:[Message.schema],
  name:String,
  image:String
});

Schema.virtual('id').get(function() { return this._id; });

module.exports = mongoose.model('GroupChat',Schema);