'use strinct'
var settings = {
    port: 8080,
    path: __dirname,
    dbConfig: { host: 'localhost', dbName: 'fastMessages' },
    secretJWT:'f4stm3s54g3s',
    host_client:'http://localhost:4200'
}

module.exports = settings;