const UsuarioModel = require("../models/Usuario");

module.exports.has = function(rol) {
    return (req, res, next) => {
        const { usuario: { usuarioId } } = req;

        UsuarioModel.encontrarUsuario({ id: usuarioId }).then((usuario) => {
            if (!usuario) {
                return res.status(403).json({
                    status: false,
                    error: "Acceso inválido, por favor inténtelo de nuevo.",
                });
            }

            const usuarioRol = usuario.rol; 

            if (usuarioRol !== rol) {
                return res.status(403).json({
                    status: false,
                    error: `Necesitas el permiso ${rol} para acceder a esta operación.`,
                });
            }

            next();
        });
    };
};
