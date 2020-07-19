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

module.exports = router;