const mongoose = require('mongoose');
//const URI = 'mongodb://127.0.0.1/proyectodb';//   Para q funcione sin docker 
//const URI = 'mongodb+srv://grupo03:ugJX3ZgQtrLpheXZ@akirashopping.h1ddstp.mongodb.net/';
//const URI = 'mongodb://mongo:27017/proyectodb'; //con docker 
//const URI = process.env.MONGO_URI;

const URI = 'mongodb://mongo1:27017,mongo2:27017,mongo3:27017/proyectodb?replicaSet=myReplicaSet';
mongoose.connect(URI)
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))



module.exports = mongoose;

