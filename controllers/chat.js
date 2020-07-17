'use strict'
//var Proyect = require('../models/project')
var controller = {
    sayHello: async function (req, res) {
        return res.status(200).send("Hola mundo!");
    }
}

module.exports = controller;