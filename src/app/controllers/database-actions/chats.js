'use strict'
var PrivateChat = require('../../models/chats/private-chat.model')
var GroupChat = require('../../models/chats/group-chat.model')
var LiveChat = require('../../models/chats/live-chat.model')
var Message = require('../../models/message.model')
var func_users = require('../database-actions/users')

var actions = {
    addGroupChat: async function (value) {
        var chat = new GroupChat(value);
        let document = await chat.save()
        //agregar chat a lista de cada usuario
        if (value && value.members) {
            value.members.forEach(element => {
                func_users.updateUser(element, { $push: { 'chats': document._id } })
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

        //agregar chat a usuarios
        //from
        await func_users.updateUser(value.from, { $push: { 'chats': document._id } })
        //to
        await func_users.updateUser(value.to, { $push: { 'chats': document._id } })
        return document;
    },
    addLiveChat: async function (value) {
        var chat = new LiveChat(value);
        let document = await chat.save()
        return document;
    },
    getChatsOfUser: async function (id_user) {
        var chatsIds = await func_users.getChatsIdOfUser(id_user);
        if (chatsIds) {
            let res = await PrivateChat.find({ "_id": { "$in": chatsIds } })
            //chats grupales
            let res2 = await GroupChat.find({ "_id": { "$in": chatsIds } })
                .select('_id name image')
            return res.concat(res2);
        }
    },
    getChat: async function (id_chat) {
        //buscar chat en privates
        let chat = await PrivateChat.findById(id_chat)
        if (!chat) {
            chat = await GroupChat.findById(id_chat)
        }
        return chat;
    },

    addMesageChat: async function (owner, id_chat, content, date) {
        let chat = await PrivateChat.findById(id_chat)
        if (!chat) {
            chat = await GroupChat.findById(id_chat)
        }

        let msg = new Message({ owner, content, date })
        chat.messages.push(msg)
        await chat.save()
        return msg;
    },
    getMembersOfChat: async function (id_chat) {
        let chat = await PrivateChat.findById(id_chat)
        if (chat) {
            return [chat.from, chat.to];
        } else {
            chat = await GroupChat.findById(id_chat)
            return chat.members;
        }
    },
    getChatByFromTo:async function (values){
      return await PrivateChat.findOne({from:values.from,to:values.to});
    }
}

module.exports = actions;
