'use strict'
var actions = require('../controllers/database-actions/public')
var actions_user = require('../controllers/database-actions/users')

var controller = {
    register: async function (req, res) {
        try {
            var response = await actions.addUser(req.body)
            .then(data=>{
                console.log('data',data)
                res.status(200).send(data);
            })
            .catch(error=>{
                console.log('error',error)
                res.status(404).send(error);
            });
        } catch (e) {
            console.log("ERROR",e)
            res.status(500).send();
        }
    },
    login: async function (req, res) {
        let user = await actions.getUserByEmail(req.body.email);
        if (user.length > 0) {
            if (user[0].password == req.body.password.toString()) {
                let user_return = await actions_user.getUser(user[0]._id);
                res.status(200).send(user_return);
            } else {
                res.status(400).send('contraseña incorrecta');
            }
        } else {
            res.status(404).send('El usuario no existe');

        }

    },
    contact: async function (req, res) {
        console.log(req.body)
        res.status(200).send();
    },
}

module.exports = controller;
