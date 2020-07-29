var actions_chat = require('./database-actions/chats');

var controller = {
    addGroupChat: async function (req, res) {
        var body = req.body;
        console.log(body)
        var response = await actions_chat.addGroupChat(body);
        if (response) {
            res.status(200).send(response);
        } else {
            throw new DataError(404, 'Usuario no encontrado')
        }
    },

    getChats: async function (req, res) {
        var id = req.user;
        var response = await actions_chat.getChatsOfUser(id);
        if (response) {
            res.status(200).send(response);
        } else {
            throw new DataError(404, 'Usuario no encontrado')
        }
    },
    getChatById: async function (req, res) {
        var id_chat = req.query.id;
        var response = await actions_chat.getChat(id_chat);
        if (response) {
            res.status(200).send(response);
        } else {
            throw new DataError(404, 'Chat no encontrado')
        }
    },
    getOrCreateChat:async function (req,res){
      var from = req.user;
      var chat = await actions_chat.getChatByFromTo(from,req.body);
      if(!chat){
          chat = await actions_chat.addPrivateChat(from,req.body)
      }
      res.status(201).send({chatId:chat._id});
    }
};

module.exports = controller;
