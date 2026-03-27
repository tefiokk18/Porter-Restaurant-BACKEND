import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt'; 

export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        usuario = new Usuario({ nombre, email, password });


        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: usuario.nombre });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
};