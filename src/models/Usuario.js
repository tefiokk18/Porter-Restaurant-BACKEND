import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    password: { type: String, required: true },
    rol: {type: String, default: 'usuario', enum: ['usuario', 'admin', 'ADMIN_ROLE'] },
    activo: { type: Boolean, default: true }
});

export default mongoose.model('Usuario', usuarioSchema);