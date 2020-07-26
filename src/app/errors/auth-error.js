'use strict'

class AuthError extends Error {
    constructor(status,message){
        super();
        this.name = 'AuthenticationError';
        this.status = status;
        this.message = message;
    }
}

module.exports = AuthError;