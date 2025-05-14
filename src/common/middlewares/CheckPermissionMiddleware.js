const UsuarioModel = require("../models/Usuario");

module.exports.has = function(role) {
    return (req, res, next) => {
        const { usuario: { usuarioId } } = req;

        UsuarioModel.encontrarUsuario({ id: usuarioId }).then((usuario) => {
            if (!usuario) {
                return res.status(403).json({
                    status: false,
                    error: "Acceso inválido, por favor inténtelo de nuevo.",
                });
            }

            const usuarioRol = usuario.role; // Cambié 'userRole' a 'usuario.role' (en lugar de 'user.role')

            if (usuarioRol !== role) {
                return res.status(403).json({
                    status: false,
                    error: `Necesitas el permiso ${role} para acceder a esta operación.`,
                });
            }

            next();
        });
    };
};
