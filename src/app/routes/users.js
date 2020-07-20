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