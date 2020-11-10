'use strinct'
var settings = {
    port: 8080,
    path: __dirname,
    dbConfig: { host: 'localhost', dbName: 'fastMessages',
    connectionString:'mongodb+srv://dev:zGpm4A3cph884TP@cluster-fast-messages.nuahr.mongodb.net/fast-msg?retryWrites=true&w=majority' },
    secretJWT:'f4stm3s54g3s',
    host_client:'http://localhost:4200'
}

module.exports = settings;