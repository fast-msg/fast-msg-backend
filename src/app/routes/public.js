'use strict'
const express = require('express');
var router =express.Router();
var controller = require('./../controllers/public')

/**
* Registro de usuarios
*
*/
router.post('/register',controller.register);

/**
* Inicio de sesión de usuario
*
*/
router.post('/login',controller.login);

/**
* Envío de mensaje a administradores
*
*/
router.post('/contact',controller.contact);

module.exports = router;