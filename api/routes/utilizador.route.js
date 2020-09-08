const router = require('express').Router();
const utilizadorController = require('.././controllers/utilizador.controller');

router.post('/registar', utilizadorController.registar);
//router.post('autenticação', utilizadorC.autenticação);

module.exports = router;