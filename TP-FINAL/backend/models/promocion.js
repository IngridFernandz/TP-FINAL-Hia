const mongoose = require('mongoose');
const { Schema } = mongoose;
const Local=require('./local');
const PromocionSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaInicio: { type: String, required: true },
    fechaFin: { type: String, required: true },
    categoria: { type: String, required: true },
    imagen: { type: String, required: true },
    publicado:{type: Boolean, required:true},
    local: {type: Schema.Types.ObjectId, ref: Local, required: true}
})
module.exports = mongoose.models.Promocion || mongoose.model('Promocion', PromocionSchema);