const Promocion = require('../models/promocion');
const promocionCtrl = {}
//agregar el populate local
promocionCtrl.getPromociones = async (req, res) => {
    var promociones = await Promocion.find().populate('local');
    res.json(promociones);
}
//filtra promociones si estan publicadas o NO
//agregar el populate local
promocionCtrl.getPromocionesByFiltro = async (req, res)=>{
    filter={}
    if (req.query.publicado!=null && req.query.publicado!=''){
        filter.publicado=req.query.publicado; 
    }
    if (req.query.local!=null && req.query.local!=''){
        filter.local=req.query.local; 
    }
    var promociones= await Promocion.find (filter).populate('local'); 
    res.status(200).json(promociones);   
}
/*promocionCtrl.getPromocionByLocal=async (req, res)=>{
    const idLocal = req.params.idLocal; 
    const promociones = await Promocion.find({ local: idLocal }).select('-imagen');
    res.status(200).json(promociones); 
}*/

promocionCtrl.createPromocion = async (req, res) => {
    var promocion = new Promocion(req.body);
    try {
        await promocion.save();
        res.json({
            'status': '1',
            'msg': 'Producto guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
promocionCtrl.getPromocion = async (req, res) => {
    const promocion = await Promocion.findById(req.params.id).populate('local');
    res.json(promocion);
}
promocionCtrl.editPromocion = async (req, res) => {
    const vpromocion = new Promocion(req.body);
    try {
        await Promocion.updateOne({ _id: req.body._id }, vpromocion);
        res.json({
            'status': '1',
            'msg': 'Producto updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
promocionCtrl.deletePromocion = async (req, res) => {
    try {
        await Promocion.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Producto removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = promocionCtrl;