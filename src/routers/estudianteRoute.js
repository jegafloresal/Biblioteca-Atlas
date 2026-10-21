const express = require('express');
const router = express.Router();
const Estudiante = require('../models/estudiante.js');

// 1. Crear un nuevo estudiante -> POST /api/estudiantes
router.post('/estudiantes', async (req, res) => {
    try {
        const nuevoEstudiante = new Estudiante(req.body);
        const estudianteGuardado = await nuevoEstudiante.save();
        res.status(201).json({
            mensaje: 'Estudiante creado exitosamente',
            data: estudianteGuardado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el estudiante', error: error.message });
    }
});

// 2. Obtener todos los estudiantes -> GET /api/estudiantes
router.get('/', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los estudiantes', error: error.message });
    }
});

// 3. Obtener un estudiante por su ID -> GET /api/estudiantes/:id
router.get('/:id', async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el estudiante', error: error.message });
    }
});

// 4. Actualizar un estudiante por su ID -> PUT /api/estudiantes/:id
router.put('/:id', async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }  
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el estudiante', error: error.message });
    }
});
    
// 5. Eliminar un estudiante por su ID -> DELETE /api/estudiantes/:id
router.delete('/:id', async (req, res) => {
    try {
        const estudianteEliminado = await Estudiante.findByIdAndDelete(req.params.id);
        if (!estudianteEliminado) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }
        res.status(200).json({ mensaje: 'Estudiante eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el estudiante', error: error.message });
    }
});

module.exports = router;