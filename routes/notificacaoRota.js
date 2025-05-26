const express = require('express');
const router = express.Router();
const pushController = require('../controllers/notificacaoContole');
const pushConfig = require('../controllers/notificacaoConfig')

// Rotas
router.post('/push', pushController.enviarpush2);
router.get('/test', pushController.testarendpoint);

// confis
router.get('/config/backupdfexml', pushConfig.buscar);
router.post('/config/backupdfexml/add', pushConfig.gravar);

module.exports = router;
