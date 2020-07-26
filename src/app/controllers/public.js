'use strict'
var actions = require('../controllers/database-actions/public')
var actions_user = require('../controllers/database-actions/users')
var AuthError = require('../errors/auth-error');

var controller = {
    register: async function (req, res) {
            var response = await actions.addUser(req.body)
            res.status(200).send(response);
    },
    login: async function (req, res) {
        let user = await actions.getUserByEmail(req.body.email);
        if (user.length > 0) {
            if (user[0].password == req.body.password.toString()) {
                let user_return = await actions_user.getUser(user[0]._id);
                res.status(200).send(user_return);
            } else {
                throw new AuthError(400,'contraseña incorrecta');
            }
        } else {
            throw new AuthError(404,'El usuario no existe');
        }
    },
    contact: async function (req, res) {
        console.log(req.body)
        res.status(200).send();
    },
}

module.exports = controller;
