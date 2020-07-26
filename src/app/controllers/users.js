var actions_users = require('./database-actions/users');
var fs = require('fs')
var DataError = require('../errors/data-error');

var controller = {
    uploadImage: async function (req, res) {
        var id = req.query.id;
        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            var filename = fileSplit[1];
            //validando extension
            var extSplit = filename.split('.');
            var ext = extSplit[1];
            if (['png', 'jpg', 'jpeg'].includes(ext)) {
                //actualizar elemento
                await actions_users.updateUser(id, { image: filename })
                    .then(response => {
                        return res.status(200).send(response.image)
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "No se ha podido cambiar la imagen" })
                    })

            } else {
                //eliminar archivo
                fs.unlink(filePath, (err) => {
                    //extension invalida
                    return res.status(500).send({ error: "Extensión inválida" })
                })
            }
        }
        else {
            return res.status(404).send({ error: "Error al subir la imagen" })
        }
    },
    getUser: async (req, res) => {
        var id = req.query.id;
        var response = await actions_users.getUser(id);
        if (response) {
            res.status(200).send(response);
        } else {
            throw new DataError(404, 'Usuario no encontrado')
        }
    },
    getContacts: async function (req, res) {
        var id = req.query.id;
        var response = await actions_users.getContactsOfUser(id);
        if (response) {
            res.status(200).send(response);
        } else {
            throw new DataError(404, 'Usuario no encontrado')
        }
    },

    addContact: async function (req, res) {
        var body = req.body;
        console.log(body)
        var response = await actions_users.addContactToUser(body);
        if (response) {
            res.status(200).send(response);
        } else {
            throw new DataError(404, 'Usuario no encontrado')
        }
    },

    editUser: async function (req, res) {
        var id = req.query.id
        var body = req.body;
        var response = await actions_users.updateUser(id, body);
        if (response) {
            res.status(200).send();
        } else {
            throw new DataError(404, 'Usuario no encontrado')
        }
    }
};

module.exports = controller;