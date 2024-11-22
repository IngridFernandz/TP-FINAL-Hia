const Cuota = require('../models/cuota');
const cuotaCtrl = {}

//Obtengo todos las cuotas
cuotaCtrl.getCuotas = async (req, res) => {
    const cuotas = await Cuota.find();
    res.json(cuotas);
}

//Doy de alta una cuota
cuotaCtrl.crearCuota = async (req, res) => {
    const cuota = new Cuota(req.body);
    try {
        await Cuota.save();
        res.json({
            'status': '1',
            'msg':'Cuota registrada'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al registrar la cuota'
        });
    }
}

//Obtengo información de una cuota
cuotaCtrl.getCuota = async (req, res) => {
    const cuota = await Cuota.findById(req.params.id);
    if (!cuota) return res.status(404).json({ msg: 'cuota no encontrada' });
    res.json(cuota);
}

//Actualizo una cuota
cuotaCtrl.updateCuota = async (req, res) => {
    const vcuota = new Cuota(req.body);
    try {
        await Cuota.updateOne({_id: req.body.id}, vcuota);
        res.json({
            'status': '1',
            'msg':'cuota actualizado'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al actualizar la cuota'
        })
    }
}

//Elimino una cuota
cuotaCtrl.deleteCuota = async (req, res) => {
    try {
        await Cuota.deleteOne({_id: req.params.id});
        res.json({
            'status': '1',
            'msg':'cuota eliminada'
        })
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error al eliminar la cuota'
        })
    }
}
cuotaCtrl.crearCuota = async (req, res) => {
    const { alquiler, mes, monto, nroCuota } = req.body;

    try {
        const nuevaCuota = new Cuota({
            alquiler,
            mes,
            monto,
            nroCuota,
            adelantos: [],
            estado: 'Pendiente' 
        });

        const cuotaGuardada = await nuevaCuota.save();
        res.status(201).json(cuotaGuardada);
    } catch (error) {
        console.error('Error al crear cuota:', error);
        res.status(500).json({ error: 'Hubo un error al crear la cuota' });
    }
};
cuotaCtrl.getCuotasAlquiler = async (req, res) => {
    const alquilerId = req.params.alquilerId;  
    try {
        const cuotas = await Cuota.find({ alquiler: alquilerId });   
        res.json(cuotas);
    } catch (error) {
        console.error('Error al buscar cuotas:', error);
        res.status(500).json({ message: 'Hubo un error al buscar cuotas' });
    }
}

module.exports = cuotaCtrl;