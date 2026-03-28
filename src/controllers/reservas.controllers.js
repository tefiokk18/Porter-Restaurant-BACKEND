import Reserva from '../models/Reserva.js';


export const crearReserva = async (req, res) => {
    try {
        const { fecha, hora } = req.body;


        const reservaExistente = await Reserva.findOne({ fecha, hora });

        if (reservaExistente) {
            return res.status(400).json({
                mensaje: "Lo sentimos, ya existe una reserva para esa fecha y hora. Por favor, elegí otro horario."
            });
        }

        const nuevaReserva = new Reserva(req.body);
        await nuevaReserva.save();

        res.status(201).json({
            mensaje: "Reserva realizada con éxito",
            reserva: nuevaReserva
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear la reserva" });
    }
};


export const obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener las reservas" });
    }
};


export const editarReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const reservaActualizada = await Reserva.findByIdAndUpdate(id, req.body, { new: true });

        if (!reservaActualizada) {
            return res.status(404).json({
                mensaje: "No se encontró la reserva que intentas editar"
            });
        }

        res.status(200).json({
            mensaje: "Reserva actualizada con éxito",
            reserva: reservaActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al intentar editar la reserva" });
    }
};

export const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reservaEliminada = await Reserva.findByIdAndDelete(id);

        if (!reservaEliminada) {
            return res.status(404).json({
                mensaje: "No se encontró la reserva que intentas eliminar"
            });
        }

        res.status(200).json({
            mensaje: "Reserva eliminada correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al intentar eliminar la reserva"
        });
    }
};