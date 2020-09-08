const router = require('express').Router();
const utilizadorController = require('.././controllers/utilizador.controller');

router.post('/registar', utilizadorController.validacaoRegisto, utilizadorController.registar);
router.post('/autenticacao', utilizadorController.validacaoAutenticacao, utilizadorController.autenticacao);

module.exports = router;