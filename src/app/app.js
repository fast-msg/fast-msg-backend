'use strict'
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var {handleErrorsExpress} = require('./middlewares/handleErrors');
var settings = require('../../settings')
var {isAuth} = require('./middlewares/handleJWT');

//archivos de rutas 
var routes_chat = require('./routes/chat')
var routes_users = require('./routes/users')
var routes_public = require('./routes/public')

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


//servicio de archivos estaticos 
app.use('/images',express.static(settings.path+'/uploads'));

//rutas
app.use('/user',isAuth,routes_users);
app.use('/chat',isAuth,routes_chat);
app.use('/public',routes_public);

//manejo de errores
app.use(handleErrorsExpress);
  
module.exports = app;
