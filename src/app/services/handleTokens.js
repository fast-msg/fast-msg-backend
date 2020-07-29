'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const settings = require('../../../settings')

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, settings.secretJWT)
}

function decodeToken(token) {
    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, settings.secretJWT)
            if (payload.exp <= moment.unix()) {
                //caducó la sesión
                reject({
                    status:401,
                    message:'El token ha expirado'
                })
            }
            resolve(payload)
        } catch (e) {
            reject({
                status: 500,
                message: 'Token inválido'
            })
        }
    })
}

module.exports = {
    createToken,
    decodeToken
};