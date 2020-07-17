'use strict'
var User = require('../models/user.model')
var controller = {
    addUser:function (user) {
        var user = new User(user);
        user.save();
    }
}

module.exports = controller;