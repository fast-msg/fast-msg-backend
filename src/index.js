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
mongoose.connect('mongodb://localhost/fastmsg',
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
var controllers = require('./app/controllers/users');


async function test() {

    var user1 = await controllers.addUser({
        name: 'Emely García',
        email: 'garciam.emm@gmail.com', password: '123456',
        status: 1,
        image:'photo'
    });

    var user2 = await controllers.addUser({
        name: 'Roberto García',
        email: 'roberto.emm@gmail.com', password: '123456',
        status: 1,
        image:'photo'
    });
    //console.log(user1._id, user2._id)

    if(user1 && user2 ){
        var chat = await controllers.addChat({
            type: 0,
            members: [user1._id, user2._id],
            image:'photo',
            name:'chat 1'
        })
        //console.log(chat)
    }

}
test();

//controllers.addContactToUser({idUser:'5f123fc118ef2f5ea2400e83',idContact:'5f123fc118ef2f5ea2400e84'})
//controllers.addContactToUser({idUser:'5f123fc118ef2f5ea2400e84',idContact:'5f123fc118ef2f5ea2400e83'})


test2();

async function test2(){
   // console.log(await controllers.getUser('5f123fc118ef2f5ea2400e83'));
   //console.log(await controllers.getContactsOfUser('5f123fc118ef2f5ea2400e83'));

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