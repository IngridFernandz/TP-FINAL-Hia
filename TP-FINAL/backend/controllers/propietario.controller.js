const Propietario = require('../models/propietario');
const propietarioCtrl = {}

//Obtengo todos los Propietarios
propietarioCtrl.getPropietarios = async (req, res) => {
    var propietarios = await Propietario.find();
    res.json(propietarios);
}

//Doy de alta un propietario
propietarioCtrl.createPropietario = async (req, res) => {
    const propietario = new Propietario(req.body);
    try {
        await propietario.save();
        res.json({
            'status': '1',
            'msg': 'Propietario registrado'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al registrar el Propietario'
        });
    }
}

//Obtengo información de un Propietario
propietarioCtrl.getPropietario = async (req, res) => {
    const propietario = await Propietario.findById(req.params.id);
    if (!propietario) return res.status(404).json({ msg: 'Propietario no encontrado' });
    res.json(propietario);
}

//Actualizo un Propietario
propietarioCtrl.editPropietario = async (req, res) => {
    const vpropietario = new Propietario(req.body);
    try {
        await Propietario.updateOne({ _id: req.body._id }, vpropietario);
        res.json({
            'status': '1',
            'msg': 'Propietario actualizado'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al actualizar el Propietario'
        })
    }
}

//Eliminar un Propietario
propietarioCtrl.deletePropietario = async (req, res) => {
    try {
        await Propietario.deleteOne({ _id: req.params.id });
        res.json({
            'status': '1',
            'msg': 'Propietario eliminado'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al eliminar el Propietario'
        })
    }
}
propietarioCtrl.getPropietarioByIdUsuario =  async (req, res) => {
 try {
        const propietario = await Propietario.findOne({ idUsuario: req.params.id });
        if (!propietario) {
            return res.status(404).send('Propietario no encontrado');
        }
        res.json(propietario);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

module.exports = propietarioCtrl;