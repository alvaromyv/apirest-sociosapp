const UsuarioModel = require("../common/models/Usuario");

module.exports = {
    obtenerUsuarios(req, res) {
        UsuarioModel.obtenerUsuarios(req.query)
            .then((usuarios) => {
                return res.status(200).json({
                    status: true,
                    data: usuarios,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
    obtenerUsuarioActual(req, res) {
        const {
            usuario: { id },
        } = req;

        UsuarioModel.obtenerUsuarioActual({ id: id })
            .then((usuario) => {
                return res.status(200).json({
                    status: true,
                    data: usuario.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
    actualizarUsuario(req, res) {
        const {
            usuario: { id }, body: payload,
        } = req;

        // IF the payload does not have any keys,
        // THEN we can return an error, as nothing can be updated
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: "El cuerpo está vacío, por lo que no se puede actualizar el socio.",
                },
            });
        }

        UsuarioModel.actualizarUsuario({ id: id }, payload)
            .then(() => {
                return UsuarioModel.obtenerUsuarioActual({ id: id });
            })
            .then((usuario) => {
                return res.status(200).json({
                    status: true,
                    data: usuario.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
    eliminarUsuario(req, res) {
        const {
            params: { id },
        } = req;

        UsuarioModel.eliminarUsuario({ id: id })
            .then((numberOfEntriesDeleted) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfUsersDeleted: numberOfEntriesDeleted
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
    cambiarRol(req, res) {
        const {
            params: { id }, body: { role },
        } = req;

        UsuarioModel.actualizarUsuario({ id: id }, { role })
            .then(() => {
                return UsuarioModel.obtenerUsuarioActual({ id: id });
            })
            .then((user) => {
                return res.status(200).json({
                    status: true,
                    data: user.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    }    
}
