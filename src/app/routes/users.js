'use strict'
const express = require('express');
var router = express.Router();
//multipart para uploads
const multipart = require('connect-multiparty');
var multiparMiddle = multipart({uploadDir:'uploads'})
const controller = require('../controllers/users')
var {catchErrors} = require('../middlewares/handleErrors');
//middleware de Authentication
const Authentication = require('../middlewares/handleJWT');

/**
 * Subir Imagen de perfil
 *  */
router.post('/upload-image',Authentication,multiparMiddle,catchErrors(controller.uploadImage));

/**
 * Información del usuario
 * Parámetros:
 *      id: del usuario
 *      none: obtener lista completa de usuarios
 */
router.get('/',Authentication,catchErrors(controller.getUser));

/**
 * Modificar info del usuario
 * Body: id,name,image,email
 */
router.put('/',Authentication,catchErrors(controller.editUser));

/**
 * Contactos del usuario
 */
router.get('/contacts',Authentication,catchErrors(controller.getContacts));

/**
 * Agregar contactos al usuario
 * Parámetros:
 *      id: del usuario
 */
router.put('/contacts/add',Authentication,catchErrors(controller.addContact));


/**
 * Agregar contactos al usuario
 * Parámetros:
 *      id: del usuario
 */
router.put('/contacts/del',Authentication,catchErrors(controller.deleteContact));

/**
 * Obtiene los contactos segun el correo
 * Parametros en body: email
 */
router.post('/contacts/email',Authentication,catchErrors(controller.getUsersByEmail));

/**
 * obtiene los contactos segun el nombre
 * Parametros en body: name
 */
router.post('/contacts/name',Authentication,catchErrors(controller.getUsersByName));

module.exports = router;
