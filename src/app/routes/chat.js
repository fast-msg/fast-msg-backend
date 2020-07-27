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

/**
* Obtener chat o crear uno si no existe en la lista del usuario
* Parametros:
*       idUser: de usuario
*       idContact: del contacto
*/
router.post('/',catchErrors(controller.getOrCreateChat));

module.exports = router;
