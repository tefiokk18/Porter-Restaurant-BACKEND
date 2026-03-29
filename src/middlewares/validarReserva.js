import { check, validationResult } from 'express-validator';

const validarReserva = [

    check('nombreCompleto')
        .notEmpty().withMessage('El nombre completo es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),


    check('fecha')
        .notEmpty().withMessage('La fecha es obligatoria')
        .isISO8601().withMessage('Formato de fecha no válido (debe ser AAAA-MM-DD)'),


    check('horario')
        .notEmpty().withMessage('El horario es obligatorio'),


    check('comensales')
        .notEmpty().withMessage('La cantidad de comensales es obligatoria')
        .isInt({ min: 1, max: 10 }).withMessage('La cantidad de comensales debe ser entre 1 y 10 personas'),


    check('sucursal')
        .notEmpty().withMessage('La sucursal es obligatoria')
        .isIn(['Yerba Buena', 'Centro']).withMessage('La sucursal seleccionada no es válida'),


    check('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ingresar un correo electrónico válido'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ 
                errores: errores.array().map(err => err.msg) 
            });
        }
        next();
    }
];

export default validarReserva;