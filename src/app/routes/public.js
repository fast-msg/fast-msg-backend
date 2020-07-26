'use strict'
const express = require('express');
var router =express.Router();
var controller = require('./../controllers/public')
var {catchErrors} = require('../middlewares/handleErrors');

/**
* Registro de usuarios
*
*/
router.post('/register',catchErrors(controller.register));

/**
* Inicio de sesión de usuario
*
*/
router.post('/login',catchErrors(controller.login));

/**
* Envío de mensaje a administradores
*
*/
router.post('/contact',catchErrors(controller.contact));

module.exports = router;