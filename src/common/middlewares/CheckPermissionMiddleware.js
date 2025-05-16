const UsuarioModel = require("../models/Usuario");

module.exports.has = function(rol) {
    return (req, res, next) => {
        const { usuario: { id } } = req;

        UsuarioModel.obtenerUsuarioActual({ id: id }).then((usuario) => {
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
                    error: `Necesitas el permiso ${rol} para realizar esta operación.`,
                });
            }

            next();
        });
    };
};
