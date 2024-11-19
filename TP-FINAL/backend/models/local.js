const mongoose = require('mongoose');
const {Schema} = mongoose;
const LocalSchema = new Schema({
    titulo: {type: String, required: true},
    precio: {type: Number, required: true},
    imagen: {type: String, required: true},
    superficie: {type: Number, required: true},
    direccion : {type: String, required: true},
    habilitado: {type: Boolean, required: true},
    nroLocal: {type: String, required: true},
    alquilado : {type: Boolean, required: true},
})
module.exports = mongoose.models.LocalSchema || mongoose.model('Local', LocalSchema);
