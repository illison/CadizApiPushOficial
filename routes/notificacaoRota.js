const express = require('express');
const router = express.Router();
const pushController = require('../controllers/notificacaoContole');

// Rotas
router.post('/push', pushController.enviarpush);
router.get('/test', pushController.testarendpoint)

module.exports = router;
