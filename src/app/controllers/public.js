'use strict'
var actions = require('../controllers/database-actions/public')
var actions_user = require('../controllers/database-actions/users')
const { createToken } = require('../services/handleTokens');
var AuthError = require('../errors/auth-error');

var controller = {
    register: async function (req, res) {
            var response = await actions.addUser(req.body)
            res.status(200).send({token:createToken(response)});
    },
    login: async function (req, res) {

        let user = await actions.getUserByEmailToLogin(req.body.email);
        if (user.length > 0) {
            if (user[0].password == req.body.password.toString()) {
                let user_return = await actions_user.getUser(user[0]._id);
                res.status(200).send({token:createToken(user_return)});
            } else {
                throw new AuthError(400,'La contraseña ingresada es incorrecta');
            }
        } else {
            throw new AuthError(404,'El usuario no ha sido registrado en Fast Messages');
        }
    },
    contact: async function (req, res) {
        console.log(req.body)
        res.status(200).send();
    },
}

module.exports = controller;
