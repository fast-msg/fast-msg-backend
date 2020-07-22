'use strict'
const app = require('./app/app');
//http
const http = require('http').Server(app);
const port = 8080;
//socket.io
const options = { /* ... */ };
const io = require('socket.io')(http, options);
//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fastMessages',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected with db!")
});
//funciones del socket
const socketActions = require('./socket-actions')
//---------------------------------------------------------------------------------------

//configuración de sockets
io.on('connection', (socket) => {
  //registro obligatorio de los usuarios a la lista de conectados
  socket.on('register', (userId) => {
      socketActions.addUser(userId, socket.id);
  });
  //envio de mensajes
    socket.on('chat-message', (msg) => {
        socketActions.newMessage(msg,socket,io);
    });

    //broadcast para todos menos el que envió el mensaje
    //socket.broadcast.emit('new-user', 'Nuevo usuario conectado.');
});



//configuración de http
http.listen(port, () => {
    console.log("Server listen on port 8080");
});

module.exports = http;
