const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  responsable: { type: String, required: true },
  descripcion: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Biblioteca', bibliotecaSchema);
