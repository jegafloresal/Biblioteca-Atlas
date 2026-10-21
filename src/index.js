require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');

const app = express();

conectarDB();

app.use(express.json());

app.use('/api/bibliotecas', require('./routes/bibliotecaRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/libros', require('./routes/libroRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
