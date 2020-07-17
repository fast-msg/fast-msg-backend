'use strict'
var app = require('./app');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8080;
server.listen(port,()=>{
    console.log("Server listen on port 8080");
});