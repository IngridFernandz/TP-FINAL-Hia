const express = require('express');
const router = express.Router();
const mercadoPagoController = require('../controllers/mercadoPago.controller');

// Endpoint para generar un link de pago
router.post('/generar-link-de-pago', mercadoPagoController.generarLinkDePago);

module.exports = router;
