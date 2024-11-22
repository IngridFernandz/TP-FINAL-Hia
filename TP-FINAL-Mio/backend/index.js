const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const {mongoose} = require('./database');


const app = express();
// Habilitar CORS para ambos orígenes: HTTP y HTTPS
app.use(cors({
  origin: [
      'http://localhost:4200',  // Frontend HTTPS en local    
  ],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true  // Permite el uso de cookies o encabezados de autorización
}));
// Configuración de CORS
//const corsOptions = { origin: 'http://localhost:4200', optionsSuccessStatus: 200 }; app.use(cors(corsOptions));


// Middlewares
//app.use(express.json());
//app.use(cors({ origin: 'https://localhost:4200' }));
app.use (bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({limit:'10mb',extend:true}));
//rutas
app.use('/api/pagos', require('./routes/pago.route.js'));
app.use('/api/alquiler', require('./routes/alquiler.route.js'));
app.use('/api/cuota', require('./routes/cuota.route.js'));
app.use('/api/propietario', require('./routes/propietario.route.js'))
app.use('/api/local', require('./routes/local.route.js'));
app.use('/api/usuario', require('./routes/usuario.route'))
app.use('/api/alquiler', require('./routes/alquiler.route'));
app.use('/api/mercado-pago', require('./routes/mercadoPago.route.js'));
app.use ('/api/promocion', require('./routes/promocion.route')); 
app.use('/api/consulta', require('./routes/consulta.route.js'));
app.use('/api/novedad', require('./routes/novedad.route.js'))
//setting
app.set('port', process.env.PORT || 3000);


//starting server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
