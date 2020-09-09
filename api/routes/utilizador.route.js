const router = require('express').Router();
const utilizadorController = require('.././controllers/utilizador.controller');
const autorizacao = require('.././middleware/autorizacao');
const tipo = require('.././helper/tipo');

router.post('/registar', utilizadorController.validacaoRegisto, utilizadorController.registar);
router.post('/autenticacao', utilizadorController.validacaoAutenticacao, utilizadorController.autenticacao);

router.get('/', autorizacao(tipo.Administrador), utilizadorController.getAll);
router.get('/:id', autorizacao(), utilizadorController.getById);

router.put('/:id', autorizacao(), utilizadorController.validacaoAtualizacao, utilizadorController.atualizar);
router.delete('/:id', autorizacao(), utilizadorController.eliminar);

router.post('/', autorizacao(), utilizadorController.criar);
module.exports = router;