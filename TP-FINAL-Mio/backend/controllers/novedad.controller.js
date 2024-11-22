const Novedad = require('../models/novedad');
const novedadCtrl = {}

//Obtengo todos las Novedades
novedadCtrl.getNovedades = async (req, res) => {
    try {
        const novedades = await Novedad.find().populate('local propietario');
        res.json(novedades);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener Novedades'
        });
    }
};

//Doy de alta una Novedad 
novedadCtrl.createNovedad = async (req, res) => {
    const novedad = new Novedad(req.body);
    try {
        await novedad.save();
        res.json({
            'status': '1',
            'msg': 'Novedad registrada'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al registrar la Novedad'
        });
    }
}
//Actualizar Estado
novedadCtrl.editNovedad = async (req, res) => {
    const vNovedad = new Novedad(req.body);
    try {
        await Novedad.updateOne({ _id: req.body._id }, vNovedad);
        res.json({
            'status': '1',
            'msg': 'Novedad actualizada'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al actualizar la Novedad'
        })
    }
}
module.exports = novedadCtrl;