'use strict'
var AuthError = require('../errors/auth-error')
var DataError = require('../errors/data-error')

function handleErrorsExpress(err, req, res, next) {
    if(err.toJson){
      res.status(err.status).json(err.toJson())  
    }else {
    res.status(500).json({
        error: 'UknownError',
        message: 'UknownError',
        status:500
    })
    }
}


function catchErrors(callback) {
    return async (req,res,next)=>{
        try {
            await callback(req,res);
        } catch (error) {

            next(error)
        }
    }
}

module.exports = {
    handleErrorsExpress,
    catchErrors
};