'use strict'

var Schema = schema({
    content: String,
    date: Date
});
module.exports = mongoose.model('Message', Schema);