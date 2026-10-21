const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  editorial: { type: String, required: true },
  anioPublicacion: { type: Number, required: true },
  paginas: { type: Number, required: true },
  categoria: { type: String, required: true },
  disponible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Libro', libroSchema);
