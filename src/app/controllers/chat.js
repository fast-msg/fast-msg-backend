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
      if(chat){
        //agregando el chat de nuevo a los usuarios
        await actions_chat.addChatToUser(chat._id,from)
        await actions_chat.addChatToUser(chat._id,req.body.to)
      }else{
          chat = await actions_chat.addPrivateChat(from,req.body)
      }
      res.status(201).send({chatId:chat._id});
    },
    deleteChatUser:async function(req,res){
      var id=req.user;
      var chatId = req.query.id;
      await actions_chat.deleteChatUser(chatId,id)
      .then(response=>{
        res.status(201).send({message:'ok'});
      })
      .catch(err=>{
        res.status(401).send({message:err.message});
      });
    },
    emptyChat:async function(req,res){
      var chatId = req.query.id;
      await actions_chat.emptyChat(chatId);
      res.status(201).send({message:'ok'});
    }
};

module.exports = controller;
