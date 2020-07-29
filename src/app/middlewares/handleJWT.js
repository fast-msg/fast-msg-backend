'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const settings = require('../../../settings')

function isAuth(req,res,next){
    if(!req.headers.authorization){
       return res.status(403).send({message:'No puede acceder al recurso'})
    }

    var token = req.headers.authorization.split(" ")[0];
    console.log(token)
    const payload = jwt.decode(token,settings.secretJWT)
    console.log(payload)
    if(payload.exp <=moment.unix()){
        //caducó la sesión
        return res.status(401).send({message:'El token ha caducado'})
    }   
    //pasar info en user
    req.user = payload.sub;
    next();
}

module.exports = {
    isAuth
};