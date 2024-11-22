const express = require("express");
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');//necesario para el auth

// Rutas para CRUD de usuarios
router.post('/',usuarioCtrl.createUsuario); // Crear usuario
router.post('/login', usuarioCtrl.loginUsuario); // Login de usuario

// Ruta para obtener un usuario por ID
router.get('/:id', usuarioCtrl.getUsuario);

// Ruta para actualizar un usuario por ID
router.put('/:id', usuarioCtrl.updateUsuario);

// Ruta para obtener todos los usuarios
router.get('/', usuarioCtrl.getUsuarios);

// Ruta para eliminar un usuario por ID
router.delete('/:id', usuarioCtrl.deleteUsuario);

module.exports = router;
