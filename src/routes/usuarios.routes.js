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

const router = Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

router.get('/', [validarJWT, validarAdmin], obtenerUsuarios);
router.put('/:id', [validarJWT, validarAdmin], suspenderUsuario);
router.delete('/:id', [validarJWT, validarAdmin], eliminarUsuario);

export default router;