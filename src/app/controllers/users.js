'use strict'
var User = require('../models/user.model')

var controller = {
    addUser: async function (value) {
        var user = new User(value);
        var document = await user.save()
            .then(document => document)
            .catch(error => error);
        if (document) {
            return document;
        }
        return null;
    },
    addContactToUser: async function (value) {
        console.log(value)
        return await updateUserById(value.idUser, { $push: { 'contacts': value.idContact } })
            .then(document => document)
            .catch(error => error);
    },
   

    getUser: async function (id) {
        return await User.findById(id, 'name email image')
            .then(document => document)
            .catch(error => error);
    },
    getContactsOfUser: async function (id) {
        var user = await User.findById(id, '_id contacts')
            .then(document => document)
            .catch(error => error);
        //consultando contactos
        return await User.find({ "_id": { "$in": user.contacts } }).select('_id name image')
            .then(document => document)
            .catch(error => error);
    },
    getInfoForChat:async function (id) {  
        return await User.findById(id, 'image name')
        .then(document => document)
        .catch(error => error);
    },
    updateUser:updateUserById
}

/**
 * Método que modifica cualquier documento de la coleccion de usuarios
 * @param {*} id del documento a modificar
 * @param {*} values Nuevos valores que se modificarán en el document
 */
async function updateUserById(id, values) {
    return await User.findByIdAndUpdate(id, values)
        .then(document => document)
        .catch(error => error);
}

module.exports = controller;