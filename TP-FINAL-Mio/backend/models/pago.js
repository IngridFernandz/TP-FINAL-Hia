const mongoose = require('mongoose');
const {Schema} = mongoose;

const PagoSchema = new Schema({
    fechaDePago: {type: Date, required: true},
    monto: {type: Number, required: true},
    medioDePago: {type: String, required: true}
});

module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema);