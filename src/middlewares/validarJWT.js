import jwt from 'jsonwebtoken';

const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            mensaje: "No hay token en la petición (Acceso denegado)"
        });
    }

    try {

    const payload = jwt.verify(token, "mi_clave_secreta_super_especial_123");

        req.id = payload.uid;
        req.nombre = payload.nombre;
        req.rol = payload.rol;

        next();

} catch (error) {
    console.error("DEBUG: Error al validar el JWT:", error.message); // <--- ESTA LÍNEA ES CLAVE
    return res.status(401).json({
        mensaje: "Token no válido o expirado"
    });
}
};

export default validarJWT;