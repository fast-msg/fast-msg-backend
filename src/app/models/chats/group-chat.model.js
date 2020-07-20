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
/*
Schema.set('toObject', { virtuals: true })
Schema.set('toJSON', { virtuals: true })

Schema.virtual('lastMessage').get(function() {
  if(this.messages){
    if(this.messages.length>0){
      return this.messages[messages.length-1]
    }
  }
});

*/
module.exports = mongoose.model('GroupChat',Schema);