'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//archivos de rutas 
var routes_chat = require('./routes/chat')
var routes_users = require('./routes/users')

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//cliente
app.use(express.static('public'))

//rutas
app.use('/user',routes_users);
app.use('/chat',routes_chat);

module.exports = app;