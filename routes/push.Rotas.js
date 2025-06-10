const express = require('express');
const router = express.Router();
const pushController = require('../controllers/push.Controller');

// Rotas
router.post('/enviar', pushController.enviarpush2);
router.get('/testar', pushController.testarendpoint);

module.exports = router;
