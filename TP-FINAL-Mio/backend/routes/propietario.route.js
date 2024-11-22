const propietarioCtrl = require('../controllers/propietario.controller');
const express = require('express');
const router = express.Router();

router.get('/', propietarioCtrl.getPropietarios);
router.post('/', propietarioCtrl.createPropietario);
router.get('/:id', propietarioCtrl.getPropietario);
router.put('/', propietarioCtrl.editPropietario);
router.delete('/:id', propietarioCtrl.deletePropietario);
router.get('/filteruser/:id', propietarioCtrl.getPropietarioByIdUsuario);

module.exports = router;