import { Router } from 'express';
import { 
    registrarUsuario, 
    loginUsuario, 
    obtenerUsuarios, 
    suspenderUsuario, 
    eliminarUsuario 
} from '../controllers/usuarios.controllers.js';
import validarJWT from '../middlewares/validarJWT.js';

const router = Router();


router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

router.get('/', [validarJWT], obtenerUsuarios);
router.put('/:id', [validarJWT], suspenderUsuario); 
router.delete('/:id', [validarJWT], eliminarUsuario); 

export default router;