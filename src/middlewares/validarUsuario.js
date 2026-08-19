import { check, validationResult } from 'express-validator';

export const validarRegistro = [
    check('nombre').isLength({ min: 2, max: 60 }).withMessage('Nombre 2-60 caracteres'),
    check('email').isEmail().withMessage('Email inválido'),
    check('password').isLength({ min: 8 }).matches(/[A-Z]/).matches(/[0-9]/).withMessage('Mínimo 8 caracteres, una mayúscula y un número'),
    check('telefono').matches(/^\+\d{8,15}$/).withMessage('Teléfono inválido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });        }
        next();
    }
]; 