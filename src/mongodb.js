const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
    console.log("we are connected with db!")
});

async function connectDb(configdb){
    await mongoose.connect(`mongodb://${configdb.host}/${configdb.dbName}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
}

module.exports = connectDb;