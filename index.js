'use strict'
const app = require('./app');
//http
const http = require('http').Server(app);
const port = 8080;
//socket.io
const options = { /* ... */ };
const io = require('socket.io')(http, options);

var users = [];

//configuración de sockets
io.on('connection', (socket) => {
    //broadcast para todos menos el que envió el mensaje
    socket.broadcast.emit('new-user', 'Nuevo usuario conectado.');
    socket.on('chat message', (msg) => {
        console.log(msg)
        var user = users.find((value) => value.nombre === msg.to);
        console.log(user)
        if (user) {
            io.to(socket.id).emit('chat message',msg);
            io.to(user.socketId).emit('chat message',msg);
        }
    });

    socket.on('register', (username) => {
        addUser(username, socket.id);
        io.to(socket.id).emit('chat message',{from:'Fast-Messages',to:username,mensaje:'Bienvenido '+username});
    });
});

function addUser(username, socketId) {
    var user = users.find((value) => value.nombre === username);
    if (user) {
        user.socketId = socketId
    } else {
        users.push({ nombre: username, socketId })
    }
}


//configuración de http
http.listen(port, () => {
    console.log("Server listen on port 8080");
});

module.exports = http;