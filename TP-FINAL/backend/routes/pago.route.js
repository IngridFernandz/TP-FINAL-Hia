const pagoCtrl = require('../controllers/pago.controller');
const express = require('express');
const router = express.Router();

//rutas
router.get('/',pagoCtrl.getPagos);
router.post('/', pagoCtrl.crearPago);
router.get('/:id', pagoCtrl.getPago);
router.put('/:id', pagoCtrl.updatePago);
router.delete('/:id', pagoCtrl.deletePago);

module.exports = router;

