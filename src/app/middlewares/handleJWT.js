'use strict'
const { decodeToken } = require("../services/handleTokens");

function Authentication(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No puede acceder al recurso' })
    }
    var token = req.headers.authorization;
    decodeToken(token)
        .then(payload => {
            req.user = payload.sub;
            next();
        })
        .catch(err => {
            res.status(err.status).send({ message: err.message })
        })
}

module.exports = Authentication;