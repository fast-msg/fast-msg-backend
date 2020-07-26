'use strict'

class DataError extends Error {
    constructor(status,message){
        super();
        this.name = 'DataError';
        this.status = status;
        this.message = message;
    }

    toJson(){
        return {
            name:this.name,
            status:this.status,
            message:this.message
        }
    }
}

module.exports = DataError;