const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombreCategoria: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Categoria', categoriaSchema);
