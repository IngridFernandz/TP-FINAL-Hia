const mongoose = require('mongoose');
const {Schema} = mongoose;
const ConsultaSchema = new Schema({
    nombreCompleto: {type: String, required: true},
    email: {type: String, required: true},
   consulta: {type: String, required: true},
   estado: {type: Boolean, required: true},
})
module.exports = mongoose.models.ConsultaSchema || mongoose.model('Consulta', ConsultaSchema);