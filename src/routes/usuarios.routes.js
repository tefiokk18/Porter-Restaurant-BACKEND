import { Router } from 'express';
import { registrarUsuario } from '../controllers/usuarios.controllers.js';

const router = Router();

// Ruta para registrar usuario: POST /api/register
router.post('/register', registrarUsuario);

export default router;