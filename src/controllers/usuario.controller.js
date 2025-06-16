const UsuarioModel = require("../common/models/Usuario");
const path = require('path');
const { Op, fn, col, where } = require("sequelize");

module.exports = {
    obtenerUsuarios(req, res) {
        UsuarioModel.obtenerUsuarios(req.query)
            .then((resultado) => {
                const { count: numberOfEntriesFound, rows: usuarios} = resultado
                return res.status(200).json({
                    status: "success",
                    data: {
                        type: "usuarios",
                        result: usuarios,
                        info: {
                            message: req.__("success.lista_usuarios"),
                        }
                    }
                });
            })
            .catch((err) => {

                console.log(err)

                return res.status(500).json({
                    status: "error",
                    error: {
                        message: req.__("error.lista_usuarios", req.__("error.reintentar"))
                    },
                });
            });
    },


    encontrarUsuario(req, res) {
        const {
            usuario: { id },
        } = req;

        UsuarioModel.encontrarUsuario({ id: id })
            .then((usuario) => {
                return res.status(200).json({
                    status: "success",
                    data: {
                        type: "usuario",
                        result: usuario,
                        info: {
                            message: req.__("success.obtener_usuario"),
                        }
                    }
                });
            })
            .catch((err) => {

                console.log(err)

                return res.status(500).json({
                    status: "error",
                    error: {
                        message: req.__("error.usuario_no_encontrado"),
                    },
                });
            });
    },

    buscarUsuario: (req, res) => {
        const { q : cadena } = req.query
        const filtro = `%${cadena}%`;

        UsuarioModel.obtenerUsuarios({
        [Op.or]: [
            { nombre: { [Op.like]: filtro } },
            { apellidos: { [Op.like]: filtro } },
            where(
            fn('CONCAT', col('nombre'), ' ', col('apellidos')),
            {
                [Op.like]: filtro
            }
            )
        ]
        })
        .then((resultado) => {
            const { count: numberOfEntriesFound, rows: usuarios} = resultado
            return res.status(200).json({
                status: "success",
                data: {
                    type: "usuarios",
                    result: usuarios,
                    info: {
                        message: req.__("success.busqueda_usuarios", numberOfEntriesFound),
                    }
                }
            })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({
                status: "error",
                error: {
                    message: req.__("fallo_servidor" , req.__("reintentar"))
                }
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
                status: "error",
                error: {
                    message: req.__("error.body_vacio_usuario_actualizar"),
                },
            });
        }

        UsuarioModel.actualizarUsuario({ id: id }, payload)
            .then(() => {
                return UsuarioModel.encontrarUsuario({ id: id });
            })
            .then((usuario) => {
                return res.status(200).json({
                    status: "success",
                    data: {
                        type: "usuario",
                        result: usuario,
                        info: {
                             message: req.__("success.actualizar_usuario"),
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({
                    status: "error",
                    error: {
                        message: req.__("error.actualizar_usuario", req.__("error.reintentar"))
                    },
                });
            });
    },

    encontrarUsuarioId(req, res) {
        const {
            params: { id },
        } = req;

        UsuarioModel.encontrarUsuario({ id: id })
            .then((usuario) => {
                if (!usuario) {
                    return res.status(404).json({
                        status: "error",
                        error: {
                            message: req.__("error.usuario_no_encontrado"),
                        },
                    });
                }
                return res.status(200).json({
                    status: "success",
                    data: {
                        type: "usuario",
                        result: usuario,
                        info: {
                            message: req.__("success.obtener_usuario"),
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({
                    status: "error",
                    error: {
                        message: req.__("error.usuario_no_encontrado"),
                    },
                });
            });
    },

    actualizarUsuarioPorId(req, res) {
        const {
            params: { id }, body: payload,
        } = req;
        
        // IF the payload does not have any keys,
        // THEN we can return an error, as nothing can be updated
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: "error",
                error: {
                    message: req.__("error.body_vacio_usuario_actualizar"),
                },
            });
        }

        UsuarioModel.actualizarUsuario({ id: id }, payload)
            .then(() => {
                return UsuarioModel.encontrarUsuario({ id: id });
            })
            .then((usuario) => {
                return res.status(200).json({
                    status: "success",
                    data: {
                        type: "usuario",
                        result: usuario,
                        info: {
                             message: req.__("success.actualizar_usuario"),
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({
                    status: "error",
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
                    status: "success",
                    data: {
                        type: "simple",
                        info: {
                            message: req.__("success.eliminar_usuario"),
                            numberOfEntriesDeleted: numberOfEntriesDeleted,
                        }
                    }
                });
            })
            .catch((err) => {

                console.log(err)

                return res.status(500).json({
                    status: "error",
                    error: {
                        message: req.__("error.eliminar_usuario", req.__("error.reintentar"))
                    },
                });
            });
    },

    subirAvatar(req, res) {
        const { params: { id }, file } = req;

        if (!file) {
            return res.status(400).json({
                status: "error",
                error: {
                    message: req.__("error.avatar_no_subido", req.__("error.reintentar"))
                }
            });
        }

        const normalizedPath = file.path.split(path.sep).join('/'); 

        UsuarioModel.actualizarUsuario({ id: id }, { avatar_url: normalizedPath })
            .then(() => UsuarioModel.encontrarUsuario({ id: id }))
            .then((usuario) => {
                return res.status(200).json({
                    status: "success",
                    data: {
                        type: "simple",
                        info: {
                            message: req.__("success.avatar_subido"),
                            avatar_url: usuario.avatar_url // ya es la URL completa guardada en BD
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    status: "error",
                    error: {
                        message: req.__("error.subir_avatar", req.__("error.reintentar"))
                    }
                });
            });
    },
}
