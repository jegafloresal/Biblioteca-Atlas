const express = require('express');
const router = express.Router();
const Biblioteca = require('../models/Biblioteca');

router.get('/', async (req, res) => {
  try {
    const bibliotecas = await Biblioteca.find();
    res.json(bibliotecas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar bibliotecas', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const biblioteca = await Biblioteca.findById(req.params.id);
    if (!biblioteca) return res.status(404).json({ mensaje: 'Biblioteca no encontrada' });
    res.json(biblioteca);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener biblioteca', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nueva = new Biblioteca(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar biblioteca', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Biblioteca.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    if (!actualizada) return res.status(404).json({ mensaje: 'Biblioteca no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar biblioteca', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Biblioteca.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Biblioteca no encontrada' });
    res.json({ mensaje: 'Biblioteca eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar biblioteca', error: error.message });
  }
});

module.exports = router;
