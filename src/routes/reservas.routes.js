import { Router } from 'express';
import { crearReserva, obtenerReservas, editarReserva, eliminarReserva} from '../controllers/reservas.controllers.js';

const router = Router();

router.route('/reservas')
    .get(obtenerReservas)
    .post(crearReserva);

router.route('/reservas/:id')
    .put(editarReserva)
    .delete(eliminarReserva); 

export default router;