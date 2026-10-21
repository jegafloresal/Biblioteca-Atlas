const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

router.get('/', async (req, res) => {
  try { res.json(await Libro.find()); } 
  catch (error) { res.status(500).json({ mensaje: error.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await Libro.findById(req.params.id);
    if (!doc) return res.status(404).json({ mensaje: 'Libro no encontrado' });
    res.json(doc);
  } catch (error) { res.status(500).json({ mensaje: error.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await new Libro(req.body).save()); } 
  catch (error) { res.status(400).json({ mensaje: error.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const doc = await Libro.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!doc) return res.status(404).json({ mensaje: 'Libro no encontrado' });
    res.json(doc);
  } catch (error) { res.status(400).json({ mensaje: error.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await Libro.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ mensaje: 'Libro no encontrado' });
    res.json({ mensaje: 'Libro eliminado exitosamente' });
  } catch (error) { res.status(500).json({ mensaje: error.message }); }
});

module.exports = router;
