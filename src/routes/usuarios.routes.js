import { Router } from 'express';
import { 
    registrarUsuario,
    loginUsuario,
    obtenerUsuarios,
    suspenderUsuario,
    eliminarUsuario
} from '../controllers/usuarios.controllers.js';
import validarJWT from '../middlewares/validarJWT.js';
import validarAdmin from '../middlewares/validarAdmin.js';
import { validarRegistro } from '../middlewares/validarUsuario.js';

const router = Router();

router.post('/registro', validarRegistro, registrarUsuario);
router.post('/login', loginUsuario);

router.get('/', validarJWT, validarAdmin, obtenerUsuarios);
router.put('/:id', validarJWT, validarAdmin, suspenderUsuario);
router.delete('/:id', validarJWT, validarAdmin, eliminarUsuario);

export default router;