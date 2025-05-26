const UsuarioModel = require("../common/models/Usuario");

module.exports = {
    obtenerUsuarios(req, res) {
        UsuarioModel.obtenerUsuarios(req.query)
            .then((usuarios) => {
                return res.status(200).json({
                    status: true,
                    message: req.__("success.lista_usuarios"),
                    data: usuarios,
                });
            })
            .catch((err) => {

                console.log(err)

                return res.status(500).json({
                    status: false,
                    error: {
                        message: req.__("error.lista_usuarios", req.__("error.reintentar"))
                    },
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
                    message: req.__("success.obtener_usuario"),
                    data: usuario.toJSON(),
                });
            })
            .catch((err) => {

                console.log(err)

                return res.status(500).json({
                    status: false,
                    error: {
                        message: req.__("error.usuario_no_encontrado"),
                    },
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
                    message: req.__("error.body_vacio_usuario_actualizar"),
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
                    message: req.__("success.actualizar_usuario"),
                    data: usuario.toJSON(),
                });
            })
            .catch((err) => {

                console.log(err)

                return res.status(500).json({
                    status: false,
                    error: {
                        message: req.__("error.actualizar_usuario", req.__("error.reintentar"))
                    },
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
                    message: req.__("success.eliminar_usuario"),
                    data: {
                        numberOfUsersDeleted: numberOfEntriesDeleted,
                    },
                });
            })
            .catch((err) => {

                console.log(err)

                return res.status(500).json({
                    status: false,
                    error: {
                        message: req.__("error.eliminar_usuario", req.__("error.reintentar"))
                    },
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
                    message: req.__("success.cambiar_rol"),
                    data: user.toJSON(),
                });
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({
                    status: false,
                    error: {
                        message: req.__("error.actualizar_usuario", req.__("error.reintentar"))
                    },
                });
            });
    }    
}
