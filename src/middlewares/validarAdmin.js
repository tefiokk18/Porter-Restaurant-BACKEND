const validarAdmin = (req, res, next) => {
    if (req.rol !== 'ADMIN_ROLE') {
        return res.status(403).json({ mensaje: "Acceso denegado: se requieren permisos de administrador" });
    }
    next();
};

export default validarAdmin;