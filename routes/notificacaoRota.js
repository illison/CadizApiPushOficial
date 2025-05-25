const express = require('express');
const router = express.Router();
const pushController = require('../controllers/notificacaoContole');

// Rotas
router.post('/push', pushController.enviarpush2);
router.get('/test', pushController.testarendpoint);

router.get('/config/backupdfexml', pushController.buscarconfigbackupdfexml);

module.exports = router;
