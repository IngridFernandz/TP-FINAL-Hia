const promocionCtrl = require('./../controllers/promocion.controller');
const express = require('express');
const router = express.Router();
router.get('/filtrar', promocionCtrl.getPromocionesByFiltro); 
//router.get('/byLocal/:idLocal', promocionCtrl.getPromocionByLocal); 
router.post('/', promocionCtrl.createPromocion);
router.get ('/', promocionCtrl.getPromociones); 
router.delete('/:id', promocionCtrl.deletePromocion);
router.put('/:id', promocionCtrl.editPromocion);
router.get('/:id', promocionCtrl.getPromocion); 

module.exports = router;