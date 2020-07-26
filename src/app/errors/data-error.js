'use strict'

class DataError extends Error {
    constructor(status,message){
        super();
        this.name = 'DataError';
        this.status = status;
        this.message = message;
    }
}

module.exports = DataError;