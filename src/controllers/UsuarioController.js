const UsuarioModel = require("../../src/common/models/Usuario");

function encontrarUsuario(req, res) {
    const {
        usuario: { usuarioId },
    } = req;

    UsuarioModel.encontrarUsuario({ id: usuarioId })
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
}

function actualizarUsuario(req, res) {
    const {
        usuario: { usuarioId }, body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
        return res.status(400).json({
            status: false,
            error: {
                message: "Body is empty, hence can not update the user.",
            },
        });
    }

    UsuarioModel.actualizarUsuario({ id: usuarioId }, payload)
        .then(() => {
            return UsuarioModel.encontrarUsuario({ id: usuarioId });
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
}

function eliminarUsuario(req, res) {
    const {
        params: { usuarioId },
    } = req;

    UsuarioModel.eliminarUsuario({ id: usuarioId })
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
}

function obtenerUsuarios(req, res) {
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
}

function cambiarRol(req, res) {
    const {
        params: { userId }, body: { role },
    } = req;

    UsuarioModel.actualizarUsuario({ id: userId }, { role })
        .then(() => {
            return UsuarioModel.encontrarUsuario({ id: userId });
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

module.exports = {encontrarUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuarios, cambiarRol};
