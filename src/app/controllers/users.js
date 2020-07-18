'use strict'
var User = require('../models/user.model')
var Chat = require('../models/chat.model')

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
    addContactToUser:async function (value) {  
        return await updateById(User,value.idUser,{$push:{'contacts':value.idContact}})
        .then(document=>document)
        .catch(error=>error);
    },
    addChat: async function (value) {
        var chat = new Chat(value);
        let document = await chat.save()
            .then(document => document)
            .catch(error => error);
        //agregar chat a lista de cada usuario
        if (value && value.members) {
            value.members.forEach(element => {
                return updateById(User, element, { $push: { 'chats': document._id } })
                    .then(document => document)
                    .catch(error => error);
            });
        }
        return document;
    },
    addMessage: async function (chatId, value) {
        //var chat = new chat(value);
        //chat.save();
    }

}

/**
 * Método que modifica cualquier documento
 * @param {*} MODEL Modelo del documento a modificar
 * @param {*} id del documento a modificar
 * @param {*} values Nuevos valores que se modificarán en el document
 */
async function updateById(MODEL, id, values) {
    return await MODEL.findByIdAndUpdate(id, values)
        .then(document => document)
        .catch(error => error);
}

module.exports = controller;