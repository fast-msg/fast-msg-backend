'use strict'
const settings = require('../settings')
const app = require('./app/app');
//http
const http = require('http').Server(app);
//socket.io
const options = { /* ... */ };
const io = require('socket.io')(http, options);
//mongoose
const connectDb = require('./mongodb');
//funciones del socket
const socketActions = require('./socket-actions');

//---------------------------------------------------------------------------------------
//configuración de sockets
io.on('connection', (socket) => {
    //registro obligatorio de los usuarios a la lista de conectados
    socket.on('register', (userId) => {
        socketActions.addUser(userId, socket.id);
    });
    //envio de mensajes
    socket.on('chat-message', (msg) => {
        socketActions.newMessage(msg, socket, io);
    });

    //broadcast para todos menos el que envió el mensaje
    //socket.broadcast.emit('new-user', 'Nuevo usuario conectado.');
});


//---------------------------------------------------------------------------------------
//config de la aplicación
async function initApp(port,dbConfig) {
    try {
        //mongodb
        await connectDb(dbConfig);
        //configuración de http
        http.listen(port, () => {
            console.log("Server listen on port 8080");
        });
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

initApp(settings.port,settings.dbConfig);
module.exports = http;
