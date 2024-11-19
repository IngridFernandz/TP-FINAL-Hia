const Alquiler = require('../models/alquiler');

const alquilerCtrl = {};

// Obtener todos los alquileres
alquilerCtrl.getAlquileres = async (req, res) => {
    try {
        const alquileres = await Alquiler.find().populate('local propietario');
        res.json(alquileres);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener alquileres'
        });
    }
};
//Obtener locales by id de propietario- SOLO DEVUELVE LOS ID DE LOCALES
alquilerCtrl.getIDLocalesByPropietario=async(req, res) => {
    const idPropietario = req.params.idPropietario; 
    const alquileres = await Alquiler.find({ propietario: idPropietario }).populate('local');
    const locales = alquileres.map(alquiler => alquiler.local._id);
    res.status(200).json(locales);
}
alquilerCtrl.getLocalesByPropietario=async(req, res)=>{
    const id =req.params.id; 
    const alquileres =await Alquiler.find ({propietario: id}).populate('local'); 
    const locales=alquileres.map(alquiler=>alquiler.local); 
    res.status(200).json(locales); 
}

// Crear un nuevo alquiler
alquilerCtrl.createAlquiler = async (req, res) => {
    const newAlquiler = new Alquiler(req.body);
    try {
        await newAlquiler.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Alquiler guardado',
            newAlquiler
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al guardar el alquiler'
        });
    }
};

// Obtener un alquiler por ID
alquilerCtrl.getAlquiler = async (req, res) => {
    try {
        const alquiler = await Alquiler.findById(req.params.id).populate('local propietario');
        if (!alquiler) {
            return res.status(404).json({
                'status': '0',
                'msg': 'Alquiler no encontrado'
            });
        }
        res.json(alquiler);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al obtener el alquiler'
        });
    }
};

// Editar un alquiler
alquilerCtrl.editAlquiler = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAlquiler = {
            plazoMeses: req.body.plazoMeses,
            costoalquiler: req.body.costoalquiler,
            fecha: req.body.fecha,
            local: req.body.local,
            propietario: req.body.propietario
        };
        await Alquiler.findByIdAndUpdate(id, { $set: updatedAlquiler }, { new: true });
        res.json({
            'status': '1',
            'msg': 'Alquiler actualizado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al actualizar el alquiler'
        });
    }
};

// Eliminar un alquiler
alquilerCtrl.deleteAlquiler = async (req, res) => {
    try {
       
        await Alquiler.deleteOne({ _id: req.params.id });
        res.status(200).json({
            'status': '1',
            'msg': 'Alquiler eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al eliminar el alquiler'
        });
    }
};

alquilerCtrl.getAlquilerByIdPropietario =  async (req, res) => {
    try {
           const alquiler = await Alquiler.find({ propietario: req.params.id }).populate('local propietario');
           if (!alquiler) {
               return res.status(404).send('Alquiler no encontrado');
           }
           res.json(alquiler);
       } catch (error) {
           res.status(500).send('Error en el servidor');
       }
   }

module.exports = alquilerCtrl;
