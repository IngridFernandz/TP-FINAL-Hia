const Consulta = require('../models/consulta');
const consultaCtrl = {}

//Obtengo todos las Consultar
consultaCtrl.getConsultas = async (req, res) => {
    var consultas = await Consulta.find();
    res.json(consultas);
}

//Doy de alta un Consulta
consultaCtrl.createConsulta = async (req, res) => {
    const consulta = new Consulta(req.body);
    try {
        await consulta.save();
        res.json({
            'status': '1',
            'msg': 'Consulta registrada'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al registrar la Consulta'
        });
    }
}
//Actualizo un Consulta
consultaCtrl.editConsulta = async (req, res) => {
    const vConsulta = new Consulta(req.body);
    try {
        await Consulta.updateOne({ _id: req.body._id }, vConsulta);
        res.json({
            'status': '1',
            'msg': 'Consulta actualizada'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al actualizar la Consulta'
        })
    }
}
module.exports = consultaCtrl;