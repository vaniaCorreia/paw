const Joi = require('joi');
const tipo = require('.././helper/tipo');
const utilizadorS = require('.././services/utilizador.service');
const validacao = require('.././middleware/validacao');

const utilizadorC = {};

utilizadorC.validacaoRegisto = function(req, res, next) {
    const schema = Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        nif: Joi.number().min(9).required(),
        contacto: Joi.number().min(9).required()       
    });
    validacao(req, next, schema);
}

utilizadorC.registar = function(req, res, next) {
    utilizadorS.registar(req.body)
        .then(() => res.json({message: 'Utilizador registado com sucesso'}))
        .catch(next);
}

utilizadorC.validacaoAutenticacao = function(req, res, next){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required() 
    });
    validacao(req, next, schema);
}

utilizadorC.autenticacao = function(req, res, next){
    utilizadorS.autenticar(req.body)
        .then(() => res.json({message: 'Utilizador autenticado com sucesso'}))
        .catch(next);
}


module.exports = utilizadorC;