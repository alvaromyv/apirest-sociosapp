const UsuarioModel = require("../models/Usuario");

module.exports.has = function(rol) {
    return (req, res, next) => {
        const { usuario: { id } } = req;

        UsuarioModel.encontrarUsuario({ id: id }).then((usuario) => {
            if (!usuario) {
                return res.status(403).json({
                    status: "error",
                    error: {
                        message: req.__("error.acceso_invalido")
                    }
                });
            }

            const usuarioRol = usuario.rol; 

            if (usuarioRol !== rol) {
                return res.status(403).json({
                    status: "error",
                    error: {
                        message: req.__("error.permiso_necesario", rol)
                    }
                });
            }
            next();
        });
    };
};
