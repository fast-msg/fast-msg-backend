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
    console.log("we are connected!")
});

//ejemplo
var func_users = require('./app/controllers/database-actions/chats');
//var func_chats = require('./app/controllers/chats');

async function test() {

    var user1 = await func_users.addUser({
        name: 'Emely García',
        email: 'garciam.emm@gmail.com', password: '123456',
        status: 1,
        image:'photo'
    });

    var user2 = await func_users.addUser({
        name: 'Roberto García',
        email: 'roberto.emm@gmail.com', password: '123456',
        status: 1,
        image:'photo'
    });
    console.log(user1._id, user2._id)
 
    if(user1 && user2 ){
       var chatp = await func_chats.addPrivateChat({
            from:user1._id, 
            to:user2._id
        })
        
        var chatg = await func_chats.addGroupChat({
            members:[user1._id],
            image:'photo',
            name:'chat 2'
        })

        var chatg = await func_chats.addGroupChat({
            members:[user1._id],
            image:'photo',
            name:'chat 4'
        })

        var chatl = await func_chats.addLiveChat({
            members:[user1._id],
            image:'photo',
            name:'chat 3',
            startDate:new Date()
        })
        var chatl = await func_chats.addLiveChat({
            members:[user1._id],
            image:'photo',
            name:'chat 5',
            startDate:new Date()
        })
    }

}
//test();

//func_users.addContactToUser({idUser:'5f125a0a11ae085be264a4be',idContact:'5f125a0a11ae085be264a4bf'})
//func_users.addContactToUser({idUser:'5f125a0a11ae085be264a4bf',idContact:'5f125a0a11ae085be264a4be'})


test2();

async function test2(){

   //console.log(await func_users.getUser('5f125a0a11ae085be264a4be'));
   //console.log(await func_users.getContactsOfUser('5f125a0a11ae085be264a4be'));
   // console.log(await func_users.getChatsOfUser('5f13218c8cb953232d4c4af0'))
}

//---------------------------------------------------------------------------------------

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
            io.to(socket.id).emit('chat message', msg);
            io.to(user.socketId).emit('chat message', msg);
        }
    });

    socket.on('register', (username) => {
        addUser(username, socket.id);
        io.to(socket.id).emit('chat message', { from: 'Fast-Messages', to: username, mensaje: 'Bienvenido ' + username });
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