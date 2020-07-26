'use strict'
function handleErrorsExpress(err, req, res, next) {
    // logic
    res.status(500).json({
        error: 'Error',
        message: err.message
    })
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