'use strict'
const express = require('express');
var router = express.Router();
//multipart para uploads
const multipart = require('connect-multiparty');
var multiparMiddle = multipart({uploadDir:'uploads'})
const controller = require('../controllers/users')
var {catchErrors} = require('../middlewares/handleErrors');

/**
 * Subir Imagen de perfil
 *  */
router.post('/upload-image',multiparMiddle,catchErrors(controller.uploadImage));

/**
 * Información del usuario
 * Parámetros:
 *      id: del usuario
 *      none: obtener lista completa de usuarios
 */
router.get('/',catchErrors(controller.getUser));

/**
 * Modificar info del usuario
 * Body: id,name,image,email
 */
router.put('/',catchErrors(controller.editUser));

/**
 * Contactos del usuario
 * Parámetros:
 *      id: del usuario
 */
router.get('/contacts',catchErrors(controller.getContacts));

/**
 * Agregar contactos al usuario
 * Parámetros:
 *      id: del usuario
 */
router.put('/contacts/add',catchErrors(controller.addContact));

/**
 * Obtiene los contactos segun el correo
 * Parametros en body: email
 */
router.get('/contacts/email',catchErrors(controller.getUsersByEmail));

/**
 * obtiene los contactos segun el nombre
 * Parametros en body: name
 */
router.get('/contacts/name',catchErrors(controller.getUsersByName));

module.exports = router;
