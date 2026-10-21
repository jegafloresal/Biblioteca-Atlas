const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/', async (req, res) => {
  try { res.json(await Usuario.find()); } 
  catch (error) { res.status(500).json({ mensaje: error.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await Usuario.findById(req.params.id);
    if (!doc) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(doc);
  } catch (error) { res.status(500).json({ mensaje: error.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await new Usuario(req.body).save()); } 
  catch (error) { res.status(400).json({ mensaje: error.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const doc = await Usuario.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!doc) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(doc);
  } catch (error) { res.status(400).json({ mensaje: error.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await Usuario.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) { res.status(500).json({ mensaje: error.message }); }
});

module.exports = router;
