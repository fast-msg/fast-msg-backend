'use strict'
const express = require('express');
var router = express.Router();

const controller = require('../controllers/chat')

/**
 * Chats del usuario
 * Parámetros:
 *      id: del usuario
 */
router.get('/user',controller.getChats);

/**
 * Obtiene un chat en particular
 * Parámetros:
 *      id: del chat
 */
router.get('/',controller.getChatById);

module.exports = router;