const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    email: { type: String, required: true },
    usuario: { type: String, required: true }, // Debe estar presente y ser requerido
    password: { type: String, required: true },
    activo: { type: Boolean, required: true, default: true },
    perfil: { type: String, required: true, enum: ['administrativo', 'propietario', 'dueño', 'usuario_comun'] }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
