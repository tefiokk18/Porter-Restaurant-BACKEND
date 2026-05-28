import { Router } from 'express';
import { 
    registrarUsuario, 
    loginUsuario, 
    obtenerUsuarios, 
    suspenderUsuario, 
    eliminarUsuario 
} from '../controllers/usuarios.controllers.js';
import validarJWT from '../middlewares/validarJWT.js';
import { validarRegistro } from '../middlewares/validarUsuario.js';

const router = Router();


router.post('/registro', validarRegistro, registrarUsuario);
router.post('/login', loginUsuario);

router.get('/', [validarJWT], obtenerUsuarios);
router.put('/:id', [validarJWT], suspenderUsuario); 
router.delete('/:id', [validarJWT], eliminarUsuario); 

export default router;