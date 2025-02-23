const express = require('express');
const router = express.Router();
const pushController = require('../controllers/notificacaoContole');

// Rotas
router.post('/push', pushController.enviarpush);

module.exports = router;
