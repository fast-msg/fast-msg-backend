'use strict'
var PrivateChat = require('../models/chats/private-chat.model')
var GroupChat = require('../models/chats/group-chat.model')
var LiveChat = require('../models/chats/live-chat.model')

var func_users = require('./users')

var controller = {
    addGroupChat: async function (value) {
        var chat = new GroupChat(value);
        let document = await chat.save()
            .then(document => document)
            .catch(error => error);
        //agregar chat a lista de cada usuario
        if (value && value.members) {
            value.members.forEach(element => {
                return func_users.updateUser(element, { $push: { 'groupChats': document._id } })
                    .then(document => document)
                    .catch(error => error);
            });
        }
        return document;
    },
    addPrivateChat: async function (value) {
        var info = await func_users.getInfoForChat(value.to);
        value['image']=info.image;
        value['name']=info.name;
        var chat = new PrivateChat(value);
        let document = await chat.save()
            .then(document => document)
            .catch(error => error);
        return document;
    },
    addLiveChat: async function (value) {
        var chat = new LiveChat(value);
        let document = await chat.save()
            .then(document => document)
            .catch(error => error);
        return document;
    },

    getPrivateChatsOfUser: async function (id) {
        var user = await User.findById(id, '_id chats')
            .then(document => document)
            .catch(error => error);

        //consultando chats 
        return await User.find({ "_id": { "$in": user.contacts } }).select('_id name ')
            .then(document => document)
            .catch(error => error);


    }
}

module.exports = controller;