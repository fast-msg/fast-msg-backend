'use strict'

class AuthError extends Error {
    constructor(status,message){
        super(message);
        this.name = 'AuthenticationError';
        this.status = status;
    }

    toJson(){
        return {
            name:this.name,
            status:this.status,
            message:this.message
        }
    }
}

module.exports = AuthError;