import Reserva from '../models/Reserva.js';

export const crearReserva = async (req, res) => {
    try {
        const { fecha, horario, sucursal } = req.body;
        const reservaExistente = await Reserva.findOne({ fecha, horario, sucursal });

        if (reservaExistente) {
            return res.status(400).json({
                mensaje: "Lo sentimos, ya existe una reserva para esa fecha, hora y sucursal."
            });
        }

        const nuevaReserva = new Reserva({
            ...req.body,
            usuario: req.id
        });

        await nuevaReserva.save();

        res.status(201).json({
            mensaje: "Reserva realizada con éxito",
            reserva: nuevaReserva
        });
    } catch (error) {
        console.error("Error al crear reserva:", error);
        res.status(500).json({ mensaje: "Error al crear la reserva" });
    }
};

export const obtenerReservas = async (req, res) => {
    try {
        let reservas;
        if (req.rol === 'ADMIN_ROLE') {
            reservas = await Reserva.find();
        } else {
            reservas = await Reserva.find({ usuario: req.id });
        }
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error" });
    }
};

export const editarReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const reserva = await Reserva.findById(id);
        if (!reserva) {
            return res.status(404).json({ mensaje: "No se encontró la reserva que intentas editar" });
        }

        if (req.rol !== 'ADMIN_ROLE' && reserva.usuario.toString() !== req.id) {
            return res.status(403).json({ mensaje: "No estás autorizado para editar esta reserva" });
        }

        const reservaActualizada = await Reserva.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            mensaje: "Reserva actualizada con éxito",
            reserva: reservaActualizada
        });
    } catch (error) {
        console.error("Error al editar reserva:", error);
        res.status(500).json({ mensaje: "Error al intentar editar la reserva" });
    }
};

export const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const reserva = await Reserva.findById(id);
        if (!reserva) {
            return res.status(404).json({ mensaje: "No se encontró la reserva que intentas eliminar" });
        }

        if (req.rol !== 'ADMIN_ROLE' && reserva.usuario.toString() !== req.id) {
            return res.status(403).json({ mensaje: "No estás autorizado para eliminar esta reserva" });
        }

        await Reserva.findByIdAndDelete(id);

        res.status(200).json({
            mensaje: "Reserva eliminada correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar reserva:", error);
        res.status(500).json({ mensaje: "Error al intentar eliminar la reserva" });
    }
};