const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

router.get('/', async (req, res) => {
  try { res.json(await Categoria.find()); } 
  catch (error) { res.status(500).json({ mensaje: error.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await Categoria.findById(req.params.id);
    if (!doc) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.json(doc);
  } catch (error) { res.status(500).json({ mensaje: error.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await new Categoria(req.body).save()); } 
  catch (error) { res.status(400).json({ mensaje: error.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const doc = await Categoria.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!doc) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.json(doc);
  } catch (error) { res.status(400).json({ mensaje: error.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await Categoria.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.json({ mensaje: 'Categoría eliminada exitosamente' });
  } catch (error) { res.status(500).json({ mensaje: error.message }); }
});

module.exports = router;
