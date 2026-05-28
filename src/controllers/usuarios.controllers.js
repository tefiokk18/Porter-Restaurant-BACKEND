import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
    try {

        const { nombre, email, password, telefono } = req.body;


        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensaje: "El email ya está registrado" });
        }

        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        res.status(201).json({
            mensaje: "Usuario registrado con éxito",
            nombre: usuario.nombre
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al registrar el usuario" });
    }
};


export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuarioEncontrado = await Usuario.findOne({ email });
        if (!usuarioEncontrado) {
            return res.status(404).json({ mensaje: "Email o contraseña incorrectos" });
        }

        const passwordValido = bcrypt.compareSync(password, usuarioEncontrado.password);
        if (!passwordValido) {
            return res.status(400).json({ mensaje: "Email o contraseña incorrectos" });
        }


        const token = jwt.sign(
            {
                uid: usuarioEncontrado._id,
                email: usuarioEncontrado.email,
                rol: usuarioEncontrado.rol,
                nombre: usuarioEncontrado.nombre
            },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        res.status(200).json({
            mensaje: "Login exitoso",
            nombre: usuarioEncontrado.nombre,
            rol: usuarioEncontrado.rol,
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al intentar loguear" });
    }
};

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '-password');
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios" });
    }
};


export const suspenderUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(id, { activo }, { new: true });
        res.status(200).json({ mensaje: "Estado actualizado", usuario });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al cambiar estado" });
    }
};


export const eliminarUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar" });
    }
};