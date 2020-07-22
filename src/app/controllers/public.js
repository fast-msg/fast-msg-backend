'use strict'
var actions = require('../controllers/database-actions/public')

var controller = {
  register:async function (req,res) {
    try {
        var response = await actions.addUser(req.body);
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        console.log(e)
        res.status(500).send();
    }
  },
  login:async function (req,res) {
      res.status(200).send();
  },
  contact:async function (req,res) {
      res.status(200).send();
  }
}

module.exports = controller;
