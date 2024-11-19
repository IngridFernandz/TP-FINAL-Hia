const alquilerCtrl = require('../controllers/alquiler.controller');
const autCtrl = require('./../controllers/auth.controller');//necesario para el auth
const express = require('express');
const router = express.Router();

router.get('/', alquilerCtrl.getAlquileres);
router.post('/',  alquilerCtrl.createAlquiler);
router.get('/:id',  alquilerCtrl.getAlquiler);
router.put('/:id',  alquilerCtrl.editAlquiler);
router.delete('/:id', alquilerCtrl.deleteAlquiler);
router.get ('/filterpropietario/:id', alquilerCtrl.getAlquilerByIdPropietario); 
//router.get ('/getIDLocalesByPropietario/:idPropietario', alquilerCtrl.getIDLocalesByPropietario);
router.get ('/getLocalesByPropietario/:id', alquilerCtrl.getLocalesByPropietario); 
module.exports = router;
