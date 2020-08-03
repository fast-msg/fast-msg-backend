const actions = require('./app/controllers/database-actions/chats');
//users:[{id:string,socket_id:string}]
var users = [];

var functions = {
  newMessage:async function (msg,socket,io){
    let savedMessage = await actions.addMesageChat(msg.owner,msg.chatId,msg.message,new Date());
    if(savedMessage){
      var members = savedMessage.canSee;
      members.forEach((item, i) => {
        var user = users.find((value) => value.id === item.toString());
         if (user) {
            io.emit('chat-message', Object.assign({chat:msg.chatId,message:savedMessage}));
             //io.to(user.socketId).emit('chat-message', savedMessage);
         }
      });
    }
  },
  addUser:function (username, socketId) {
      var user = users.find((value) => value.id === username);
      if (user) {
          user.socketId = socketId
      } else {
          users.push({ id: username, socketId })
      }
  }

}

module.exports = functions;
