const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true
    },
    promedio: {
        type: Number,
        required: [true, 'El promedio es obligatorio']
    }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);