import { Schema, model } from 'mongoose';

const reservaSchema = new Schema({
    fecha: {
        type: String, 
        required: true
    },

    horario: {
        type: String,
        required: true
    },

    comensales: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    sucursal: {
        type: String,
        required: true,
        enum: ['Yerba Buena', 'Centro'] 
    },
    nombreCompleto: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Por favor, ingresa un correo electrónico válido']
    },
    telefono: {
        type: String,
        required: true
    },
    notas: {
        type: String,
        maxLength: 500 
    }
});

const Reserva = model('reserva', reservaSchema);

export default Reserva;