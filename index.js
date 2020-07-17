'use strict'
const app = require('./app');
//http
const http = require('http').Server(app);
const port = 8080;
//socket.io
const options = { /* ... */ };
const io = require('socket.io')(http, options);


//configuración de sockets
io.on('connection',(socket) => {
    console.log('a user connected');
    //broadcast para todos menos el que envió el mensaje
    socket.broadcast.emit('new-user','Nuevo usuario conectado.'); 
    socket.on('chat message', (msg) => {
        //envia a todos los usuarios
        io.emit('chat message', msg);
      });
  });


//configuración de http
http.listen(port,()=>{
    console.log("Server listen on port 8080");
});

module.exports = http;