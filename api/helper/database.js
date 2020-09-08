//require('dotenv').config();
const config = require('../config.json');
const mongoose = require('mongoose');

//mongoose.connect(process.env.DATABASE_CONN, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(config.DATABASE_CONN, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Verifica se o id é um ObjectId Mongo válido antes de executar uma consulta
function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
    Utilizadores: require('.././models/utilizador.model'),
    isValidId
};