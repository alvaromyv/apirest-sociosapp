const SocioModel = require("../common/models/Socio");
const { Op, fn, col, where } = require("sequelize");

module.exports = {
  obtenerSocios: (req, res) => {
    const { query: filters } = req;

    SocioModel.obtenerSocios(filters)
      .then((resultado) => {
        const { count: numberOfEntriesFound, rows: socios} = resultado
        return res.status(200).json({
          status: true,
          data: socios,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
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
          data: socio.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: {
            message: "El socio seleccionado ya no existe.",
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
        const { count: numberOfEntriesFound, rows: socios } = resultado;
        if(numberOfEntriesFound > 0){
          return res.status(200).json({
            status: true,
            data: socios,
          });
        } else {
          return res.status(200).json({
            status: false,
            error: {
              message: "No se encontró ningún socio con ese nombre o apellidos.",
            },
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err
        });
      });
  },

  obtenerContabilidad: (req, res) => {
    SocioModel.obtenerContabilidad()
      .then((contabilidad) => {
        return res.status(200).json({
          status: true,
          data: contabilidad,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
    });
  },


  crearSocio: (req, res) => {
    const { body } = req;
    
    SocioModel.crearSocio(body)
      .then((socio) => {
        return res.status(200).json({
          status: true,
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
          message: "El cuerpo está vacío, por lo que no se puede actualizar el socio.",
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

  reasignarNumeracion: (req, res) => {
    SocioModel.obtenerSocios({}, [['antiguedad', 'ASC']])
      .then((socios) => {
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
          data: {
            message: "¡Numeración reasignada correctamente!"
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err
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
          data: {
            numberOfEntriesDeleted: numberOfEntriesDeleted
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
};
