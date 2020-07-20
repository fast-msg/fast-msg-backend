'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema;

var Schema = schema({
    name: String,
    email: String,
    password: String,
    status: Number,
    image: String,
    contacts: [String],
    chats: [String],
    settings: {
        theme: String
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

Schema.virtual('id').get(function () { return this._id; });

//---------STATUS----------------
//1 - active
//2 - desactivate
//3 - congelate

module.exports = mongoose.model('User', Schema);