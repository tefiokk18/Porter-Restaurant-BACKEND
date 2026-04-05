import { Router } from 'express';
import { 
    crearReserva, 
    obtenerReservas, 
    editarReserva, 
    eliminarReserva 
} from '../controllers/reservas.controllers.js';
import validarJWT from '../middlewares/validarJWT.js';

const router = Router();


router.route('/mis-reservas')
    .get([validarJWT], obtenerReservas);


router.route('/reservas')
    .get([validarJWT], obtenerReservas) 
    .post([validarJWT], crearReserva);  

router.route('/reservas/:id')
    .put([validarJWT], editarReserva)
    .delete([validarJWT], eliminarReserva);

export default router;