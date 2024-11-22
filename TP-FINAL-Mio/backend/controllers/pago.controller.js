const Pago = require('../models/pago');
const pagoCtrl = {}

//Obtengo todos los pagos
pagoCtrl.getPagos = async (req, res) => {
    const pagos = await Pago.find();
    res.json(pagos);
}

//Doy de alta un pago de alquiler
pagoCtrl.crearPago = async (req, res) => {
    const pago = new Pago(req.body);
    try {
        await pago.save();
        res.json({
            'status': '1',
            'msg':'Pago registrado'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al registrar el pago'
        });
    }
}

//Obtengo información de un pago
pagoCtrl.getPago = async (req, res) => {
    const pago = await Pago.findById(req.params.id);
    if (!pago) return res.status(404).json({ msg: 'Pago no encontrado' });
    res.json(pago);
}

//Actualizo un pago
pagoCtrl.updatePago = async (req, res) => {
    const vpago = new Pago(req.body);
    try {
        await Pago.updateOne({_id: req.body.id}, vpago);
        res.json({
            'status': '1',
            'msg':'Pago actualizado'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al actualizar el pago'
        })
    }
}

//Elimino un pago
pagoCtrl.deletePago = async (req, res) => {
    try {
        await Pago.deleteOne({_id: req.params.id});
        res.json({
            'status': '1',
            'msg':'Pago eliminado'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al eliminar el pago'
        })
    }
}

module.exports = pagoCtrl;