'use strict'
const express = require('express');
const controller = require('../controllers/chat');
var router = express.Router();


router.get('/',controller.sayHello);

module.exports = router;