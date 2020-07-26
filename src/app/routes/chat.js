'use strict'
const express = require('express');
var router = express.Router();
var {catchErrors} = require('../middlewares/handleErrors');

const controller = require('../controllers/chat')

/**
 * Chats del usuario
 * Parámetros:
 *      id: del usuario
 */
router.get('/user',catchErrors(controller.getChats));

/**
 * Obtiene un chat en particular
 * Parámetros:
 *      id: del chat
 */
router.get('/',catchErrors(controller.getChatById));

module.exports = router;