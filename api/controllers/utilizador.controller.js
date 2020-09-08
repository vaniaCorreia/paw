//const Joi = require('joi');
const tipo = require('.././helper/tipo');
const utilizadorS = require('.././services/utilizador.service');

const utilizadorC = {};

utilizadorC.registar = function(req, res, next) {
    utilizadorS.registar(req.body)
        .then(() => res.json({message: 'Utilizador registado com sucesso'}))
        .catch(next);
}


module.exports = utilizadorC;