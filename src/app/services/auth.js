'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const settings = require('../../../settings')

function createToken(user){
    const payload = {
        sub:user._id,
        iat:moment().unix(),
        exp: moment().add(14,'days').unix()
    }
    return jwt.encode(payload,settings.secretJWT)
}



module.exports = {
    createToken
};