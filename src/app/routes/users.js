'use strict'
const express = require('express');
var router = express.Router();

const controller = require('../controllers/users')
/**
 * Información del usuario
 * Parámetros:
 *      id: del usuario
 */
router.get('/',controller.getUser);
/**
 * Contactos del usuario
 * Parámetros:
 *      id: del usuario
 */
router.get('/contacts',controller.getContacts);
/**
 * Chats del usuario
 * Parámetros:
 *      id: del usuario
 */
router.get('/chats',controller.getChats);


module.exports = router;