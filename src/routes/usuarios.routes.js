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

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

router.get('/usuarios', [validarJWT], obtenerUsuarios);
router.put('/usuarios/suspender/:id', [validarJWT], suspenderUsuario);
router.delete('/usuarios/eliminar/:id', [validarJWT], eliminarUsuario);

export default router;