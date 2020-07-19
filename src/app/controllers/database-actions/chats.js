'use strict'
var PrivateChat = require('../../models/chats/private-chat.model')
var GroupChat = require('../../models/chats/group-chat.model')
var LiveChat = require('../../models/chats/live-chat.model')

var func_users = require('../database-actions/users')

var actions = {
    addGroupChat: async function (value) {
        var chat = new GroupChat(value);
        let document = await chat.save()
            .then(document => document)
            .catch(error => error);
        //agregar chat a lista de cada usuario
        if (value && value.members) {
            value.members.forEach(element => {
                func_users.updateUser(element, { $push: { 'chats': document._id } })
                    .then(document => document)
                    .catch(error => error);
            });
        }
        return document;
    },
    addPrivateChat: async function (value) {
        var info = await func_users.getInfoForChat(value.to);
        value['image'] = info.image;
        value['name'] = info.name;
        var chat = new PrivateChat(value);
        let document = await chat.save()
            .then(document => document)
            .catch(error => error);

        //agregar chat a usuarios
        //from
        await func_users.updateUser(value.from, { $push: { 'chats': document._id } })
            .then(document => document)
            .catch(error => error);
        //to
        await func_users.updateUser(value.to, { $push: { 'chats': document._id } })
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
    getall:function (param) {  
        return "ola"
    },
    getListChat: async function (chatsIds) {
        //consultando chats
        //chats privados 
        let res = await PrivateChat.find({ "_id": { "$in": chatsIds } }).select('_id name image ')
            .then(document => document)
            .catch(error => error);
        //chats grupales
        let res2 = await GroupChat.find({ "_id": { "$in": chatsIds } }).select('_id name image ')
            .then(document => document)
            .catch(error => error);
        return res.concat(res2);
    }
}

module.exports = actions;