'use strict'
var User = require('../../models/user.model')

var actions = {
    addChatToUser: async function (chat_id,user_id) {
        return await updateUserById(user_id,{$addToSet: { 'chats': chat_id } })
    },
    addContactToUser: async function (id,value) {
        return await updateUserById(id, { $push: { 'contacts': value.idContact } })
    },
    delContactToUser: async function (id,value) {
        return await updateUserById(id, { $pull: { 'contacts': value.idContact } })
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
    getAllUser: async function () {
        return await User.find({}).select('name email image')
    },
    updateUser: updateUserById,

    getUserByEmail: async function (email) {
        return await User.find({ email }).select('name email image')
    },
    getUserByName: async function (id, name) {
        var user = await User.findById(id, 'contacts')
        var list = await User.find({
            $and: [{ name: new RegExp(name, 'i') },
            { _id: { $ne: user._id } }, { _id: { $nin: user.contacts } }]
        })
        .select('name email image')
        return list;
    },

    deleteChatUser:async function(id_chat,id_user){
      return await updateUserById(id_user, { $pull: { 'chats': id_chat } })
    }
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
