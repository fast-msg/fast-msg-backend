'use strict'
const express = require('express');
var router = express.Router();
var {catchErrors} = require('../middlewares/handleErrors');
const Authentication = require('../middlewares/handleJWT');
const controller = require('../controllers/chat')

/**
 * Chats del usuario
 * Parámetros:
 */
router.get('/user',Authentication,catchErrors(controller.getChats));

/**
 * Obtiene un chat en particular
 * Parámetros:
 *      id: del chat
 */
router.get('/',Authentication,catchErrors(controller.getChatById));

/**
* Obtener chat o crear uno si no existe en la lista del usuario
* Parametros:
*       idContact: del contacto
*/
router.post('/',Authentication,catchErrors(controller.getOrCreateChat));

/**
*Eliminar el chat de la lista del usuario
* Parametros:
*       idChat: id de chat
*/
router.delete('/',Authentication,catchErrors(controller.deleteChatUser));

/**
*Eliminar los mensajes del chats
* Parametros:
*       idChat: id de chat
*/
router.delete('/empty',Authentication,catchErrors(controller.emptyChat));

module.exports = router;
