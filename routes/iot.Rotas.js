const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iot_.Controller')

router.post('/add', iotController.gravarInteracao);
router.get('/', iotController.mensagemRetorno);


module.exports = router;
