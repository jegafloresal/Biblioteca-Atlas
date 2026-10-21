const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Importar rutas
const estudianteRouter = require('./routers/estudianteRoute.js');

// Middlewares
app.use(express.json());

// Montar las rutas principales bajo /api
app.use('/api', estudianteRouter);

// Ruta de prueba raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a Nexo Atlas - FLORES ALVAREZ');
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexión exitosa a la base de datos MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos MongoDB Atlas:', error);
  });

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});