const mongoose = require('mongoose');
const local = require('./local');
const {Schema} = mongoose;
const AlquilerSchema = new Schema({


    plazoMeses: {type: Number, required: true},
    costoalquiler: {type: Number, required: true},
    fecha: {type: Date, required: true},
    local: { type: Schema.Types.ObjectId, ref: 'Local', required: true },
    propietario: { type: Schema.Types.ObjectId, ref: 'Propietario', required: true }
})
module.exports = mongoose.models.AlquilerSchema || mongoose.model('Alquiler', AlquilerSchema);