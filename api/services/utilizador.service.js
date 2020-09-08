const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const database = require('.././helper/database');
const tipo = require('.././helper/tipo');
const Utilizador = database.Utilizadores;

module.exports = {
    registar
};

async function registar(params) {
    //validar
    //verifica se o email já existe, se sim devolve uma mensage a dizer que o email já existe
    if(await Utilizador.findOne({email: params.email})){
        throw 'Email "'+params.email+'" já existe!'
    }
        
    //Objeto utilizador
    const utilizador = new Utilizador(params);
    
    //primeira conta a ser registada
    const firstUser = (await Utilizador.countDocuments({}) === 0);
    utilizador.tipo = firstUser ? tipo.Administrador : tipo.Utilizador;
    
    //hash à password
    const salt = await bcrypt.genSalt(10);
    utilizador.password = await bcrypt.hash(params.password, salt);

    //salvar novo utilizador
    await utilizador.save();
}