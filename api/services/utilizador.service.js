const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const database = require('.././helper/database');
const tipo = require('.././helper/tipo');
const Utilizador = database.Utilizadores;

module.exports = {
    registar,
    autenticar,
    getAll,
    getById, 
    atualizar
};

async function registar(params) {
    //validar
    //verifica se o email já existe, se sim devolve uma mensagem a dizer que o email já existe
    if(await Utilizador.findOne({email: params.email})){
        throw 'Email "'+params.email+'" já existe!'
    }

    //Verifica se o nif já existe, se sim devolve uma mensagem a dizer que o nif já existe
    if(await Utilizador.findOne({nif: params.nif})){
        throw 'Nif "'+params.nif+'" já existe!'
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

async function autenticar({email, password}){
    //validar
    //verifica se o email existe, se não existir devolve uma mensagem
    const utilizador = await Utilizador.findOne({email});
    if(!utilizador){
        throw 'O email não existe';
    } 

    //agora vai-se verificar se a introduzida pelo utilizador corresponde 
    //à password guardada na base de dados
    const passU = await bcrypt.compare(password, utilizador.password);
    if(!passU){
        throw 'Password incorreta';
    }

    //autenticação bem sucedida vai-se criar um token
    const token = jwt.sign({sub: utilizador.id}, config.secret, { expiresIn: '24h' });

    //retorna informação do utilizador e o token
    return {
        ...infoUtilizador(utilizador),
        token
    };
}

async function getAll(){
    const utilizador = await Utilizador.find();
    return utilizador.map(x => infoUtilizador(x));

}

async function getById(id){
    const utilizador = await getUtilizador(id);
    return infoUtilizador(utilizador);
}

async function atualizar(id, params){
    const utilizador = await getUtilizador(id);

    if(params.email && utilizador.email !== params.email && await Utilizador.findOne({email: params.email})){
        throw 'Email "' + params.email + '"já existe';
    }

    if(params.nif && utilizador.nif !== params.nif && await Utilizador.findOne({email: params.nif})){
        throw 'Este nif "' + params.nif + '"já existe';
    }

    if(params.password){
        const salt = await bcrypt.genSalt(10);
        params.password = await bcrypt.hash(params.password, salt);
    }

    Object.assign(utilizador, params);
    await utilizador.save();

    return infoUtilizador(utilizador);
}

//funções auxiliares
function infoUtilizador(utilizador){
    const {id, nome, email, nif, contacto, tipo} = utilizador;
    return {id, nome, email, nif, contacto, tipo};
}

async function getUtilizador(id){
    if(!database.isValidId(id)) throw 'Utilizador não foi encontrado';
    const utilizador = await Utilizador.findById(id);
    if(!utilizador) throw 'Utilizador não foi encontrado';
    return utilizador;
}