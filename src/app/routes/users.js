'use strict'
const express = require('express');
var router = express.Router();
//multipart para uploads 
const multipart = require('connect-multiparty');
var multiparMiddle = multipart({uploadDir:'uploads'})
const controller = require('../controllers/users')

/**
 * Subir Imagen de perfil
 *  */ 
router.post('/upload-image',multiparMiddle,controller.uploadImage);

/**
 * Información del usuario
 * Parámetros:
 *      id: del usuario
 */
router.get('/',controller.getUser);
/**
 * Modificar info del usuario
 * Body: id,name,image,email
 */
router.put('/',controller.editUser);

/**
 * Contactos del usuario
 * Parámetros:
 *      id: del usuario
 */
router.get('/contacts',controller.getContacts);
/**
 * Agregar contactos al usuario
 * Parámetros:
 *      id: del usuario
 */
router.put('/contacts/add',controller.addContact);

module.exports = router;