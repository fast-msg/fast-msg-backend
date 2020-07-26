'use strict'
var User = require('../../models/user.model')

var actions = {
    addContactToUser: async function (value) {
        return await updateUserById(value.idUser, { $push: { 'contacts': value.idContact } })
    },

    getUser: async function (id) {
        return await User.findById(id, 'name email image')
    },
    getContactsOfUser: async function (id) {
        var user = await User.findById(id, '_id contacts')
        //consultando contactos
        if (user) {
            return await User.find({ "_id": { "$in": user.contacts } }).select('_id name image')
        }
    },
    getInfoForChat: async function (id) {
        return await User.findById(id, 'image name')
    },
    getChatsIdOfUser: async function (id) {
        return await User.findById(id, 'chats')
    },
    updateUser: updateUserById
}

/**
 * Método que modifica cualquier documento de la coleccion de usuarios
 * @param {*} id del documento a modificar
 * @param {*} values Nuevos valores que se modificarán en el document
 */
async function updateUserById(id, values) {
    return await User.findByIdAndUpdate(id, values)
}

module.exports = actions;
