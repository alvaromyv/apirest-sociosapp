const SocioModel = require("../common/models/Socio");

module.exports = {
  obtenerSocios: (req, res) => {
    const { query: filters } = req;

    SocioModel.obtenerSocios(filters)
      .then((socios) => {
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