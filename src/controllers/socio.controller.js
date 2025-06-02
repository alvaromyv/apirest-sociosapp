const SocioModel = require("../common/models/Socio");
const { Op, fn, col, where } = require("sequelize");

module.exports = {
  obtenerSocios: (req, res) => {
    const { query: filters } = req;

    SocioModel.obtenerSocios(filters)
      .then((resultado) => {
        const { count: numberOfEntriesFound, rows: socios} = resultado
        return res.status(200).json({
          status: "success",
          data: {
            result: socios,
            info: {
              message: req.__("success.lista_socios", numberOfEntriesFound),
            }
          }
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({
          status: "error",
          error: {
            message: req.__("error.lista_socios", req.__("error.reintentar"))
          },
        });
      });
  },

  obtenerSocioPorId: (req, res) => {
    const {
      params: { id },
    } = req;

    SocioModel.encontrarSocio({ id: id })
      .then((socio) => {
        return res.status(200).json({
          status: true,
          message: req.__("success.socio_obtenido", socio.nombre, socio.apellidos),
          data: socio.toJSON(),
          
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: {
            message: req.__("error.socio_no_existe"),
          },
        });
      });
  },

  buscarSocio: (req, res) => {
    const { q : cadena } = req.query
    const filtro = `%${cadena}%`;

    SocioModel.obtenerSocios({
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
        const { count: numberOfEntriesFound, rows: socios} = resultado
        return res.status(200).json({
            status: true,
            message: req.__("success.busqueda_socios", numberOfEntriesFound),
            data: socios,
        })
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: {
            message: req.__("fallo_servidor" , req.__("reintentar"))
          }
        });
      });
  },

  crearSocio: (req, res) => {
    const { body } = req;
    
    SocioModel.crearSocio(body)
      .then((socio) => {
        return res.status(200).json({
          status: true,
          message: req.__("success.crear_socio"),
          data: socio.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  actualizarSocio: (req, res) => {
    const {
      params: { id },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: req.__("error.body_vacio_socio_actualizar"),
        },
      });
    }

    SocioModel.actualizarSocio({ id: id }, payload)
      .then(() => {
        return SocioModel.encontrarSocio({ id: id });
      })
      .then((socio) => {
        return res.status(200).json({
          status: true,
          message: req.__("success.actualizar_socio"),
          data: socio.toJSON(),
        });
      })
      .catch((err) => {

        console.log(err)

        return res.status(500).json({
          status: false,
          error: {
            message: req.__("error.modificar_socio", req.__("error.reintentar")),
          },
        });
      });
  },

  reasignarNumeracion: (req, res) => {
    SocioModel.obtenerSocios({}, [['fecha_antiguedad', 'ASC']])
      .then((resultado) => {
        const { count: numberOfEntriesFound, rows: socios} = resultado
        const promesas = socios.map((socio, indice) => {
          return SocioModel.actualizarSocio(
            { id: socio.id },
            { n_socio: indice + 1 }
          );
        });

        return Promise.all(promesas);
      })
      .then(() => {
        return res.status(200).json({
          status: true,
          message: req.__("success.reasignar_numeracion")
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({
          status: false,
          error: {
            message: req.__("error.reasignar_numeracion_socios", req.__("error.reintentar")),
          }
        });
      });
  },

  eliminarSocio: (req, res) => {
    const {
      params: { id },
    } = req;

     SocioModel.eliminarSocio({id: id})
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          message: req.__("success.eliminar_socio"),
          data: {
            numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {

        console.log(err)

        return res.status(500).json({
          status: false,
          error: {
            message: req.__("error.eliminar_socio", req.__("error.reintentar"))
          },
        });
      });
  },
};
