'use strict'
var PrivateChat = require('../../models/chats/private-chat.model')
var GroupChat = require('../../models/chats/group-chat.model')
var LiveChat = require('../../models/chats/live-chat.model')
var Message = require('../../models/message.model')
var DataError = require('../../errors/data-error');

var func_users = require('../database-actions/users')

var actions = {
  addChatToUser: async function (chat_id, user_id) {
    return func_users.addChatToUser(chat_id, user_id);
  },
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
  addPrivateChat: async function (from, value) {
    var info = await func_users.getInfoForChat(value.to);
    value['image'] = info.image;
    value['name'] = info.name;
    value['from'] = from;
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
    var userChat = await func_users.getChatsIdOfUser(id_user);
    if (userChat) {
      let chats = [];
      let res = await PrivateChat.find({ "_id": { "$in": userChat.chats } }).select('from to')
      let usr;
      res.forEach(async element => {
        if (element.from == id_user) {
            usr = await func_users.getUser(element.to);
            if (usr)chats.push({ _id: element._id, name: usr.name, image: usr.image })
          } else {
            usr = await func_users.getUser(element.from);
            if (usr)chats.push({ _id: element._id, name: usr.name, image: usr.image })
          }
      });
      //chats grupales
      let res2 = await GroupChat.find({ "_id": { "$in": userChat.chats } }).select('_id name image')
      return chats.concat(res2);
    }
  },
  getChat: async function (id_chat, user_id) {
    //buscar chat en privates
    let pchat = await PrivateChat.findById(id_chat)
    let chat;
    if(pchat){
      let usr;
      if (pchat.from == user_id) {
          usr = await func_users.getUser(pchat.to);
          if (usr) chat = { _id: pchat._id, name: usr.name, image: usr.image };
        } else {
          usr = await func_users.getUser(pchat.from);
          if (usr)chat = { _id: pchat._id, name: usr.name, image: usr.image };
        }
        //filtrar mensajes
        let messages = []
        pchat.messages.forEach(element => {
          if (element.canSee.includes(user_id)) {
            messages.push(element)
          }
        });
        //asignando mensajes
        chat.messages = messages;
    }
    if (!chat) {
      chat = await GroupChat.findById(id_chat)
    }
    return chat;
  },

  addMesageChat: async function (owner, id_chat, content, date) {
    //chat privado
    let chat = await PrivateChat.findById(id_chat)
    let msg;
    if (chat) {
      msg = new Message({ owner, content, date, canSee: [chat.from, chat.to] })
    } else {
      //chat grupal
      chat = await GroupChat.findById(id_chat)
      if (chat) {
        msg = new Message({ owner, content, date, canSee: chat.members })
      } else {
        throw new DataError(404, 'La conversación no existe')
      }
    }
    if (msg) {
      chat.messages.push(msg)
      await chat.save()
      return msg;
    }
    return null;
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
  getChatByFromTo: async function (from, values) {
    return await PrivateChat.findOne({ from, to: values.to }).select('name');
  },
  deleteChatUser: async function (id_chat, id_user) {
    //eliminando de lista de usuario
    await func_users.deleteChatUser(id_chat, id_user);
    //actualizando canSee de mensajes
    await PrivateChat.findByIdAndUpdate(id_chat,
      { messages: { $pull: { 'canSee': id_user } } });
  },
  emptyChat: async function (id_chat, id_user) {
    await PrivateChat.findByIdAndUpdate(id_chat,
      { messages: { $pull: { 'canSee': id_user } } })
  }
}

module.exports = actions;
