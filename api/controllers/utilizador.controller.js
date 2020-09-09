const Joi = require('joi');
const utilizadorS = require('.././services/utilizador.service');
const validacao = require('.././middleware/validacao');
const tipo = require('.././helper/tipo');

const utilizadorC = {};

utilizadorC.validacaoRegisto = function(req, res, next) {
    const schema = Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        nif: Joi.number().min(9).required(),
        contacto: Joi.number().min(9).required(),
        tipo: Joi.string().empty('')      
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
        .then(utilizador => res.json(utilizador))
        .catch(next);
}

utilizadorC.getAll = function(req, res, next){
    utilizadorS.getAll()
        .then(utilizador => res.json(utilizador))
        .catch(next);
}

utilizadorC.getById = function(req, res, next) {
    if(req.params.id !== req.user.id && req.user.tipo !== tipo.Administrador){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    utilizadorS.getById(req.params.id)
        .then(utilizador => utilizador ? res.json(utilizador) : res.sendStatus(404))
        .catch(next);
}

utilizadorC.validacaoAtualizacao = function(req, res, next) {
    const schema = Joi.object({
        nome: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        nif: Joi.number().min(9).empty(''),
        contacto: Joi.number().min(9).empty('')       
    });

    if(req.user.tipo === tipo.Administrador){
        schema.tipo = Joi.string().valid(tipo.Administrador, tipo.Utilizador).empty('');
    }

    validacao(req, next, schema);
}

utilizadorC.atualizar = function(req, res, next) {
   /* if(req.params.id !== req.user.id && req.user.tipo !== tipo.Administrador){
        return res.status(401).json({ message: 'Unauthorized' });
    }*/
    utilizadorS.atualizar(req.params.id, req.body)
        .then(utilizador => res.json(utilizador))
        .catch(next);
}

utilizadorC.eliminar = function (req, res, next) {
    /* if(req.params.id !== req.user.id && req.user.tipo !== tipo.Administrador){
        return res.status(401).json({ message: 'Unauthorized' });
    }*/
    utilizadorS.delete(req.params.id)
        .then(() => res.json({message: 'O utilizador foi eliminado com sucesso'}))
        .catch(next);
}

utilizadorC.validacaoCreate = function(req, res, next) {
    const schema = Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        nif: Joi.number().min(9).required(),
        contacto: Joi.number().min(9).required(),
        tipo: Joi.string().valid(tipo.Administrador, tipo.Utilizador).required  
    });
    validacao(req, next, schema);
}

utilizadorC.criar = function(req, res, next){
    utilizadorS.create(req.body)
        .then(utiliador => res.json(utilizador))
        .catch(next);
}

module.exports = utilizadorC;