const { categorias } = require("../../config");

module.exports = {
  type: "object",
  properties: {
    n_socio: {
      type: "number"
    },
    nombre: {
        type: "string",
    },
    apellidos: {
        type: "string",
    },
    telefono: {
        type: "string",
    },
    categoria: {
        type: "string",
        enum: Object.values(categorias),
    },
    antiguedad: {
        type: "string",
        format: "date",
    },
    cuota: {
        type: "number",
    },
    abonado: {
        type: "boolean",
    },
    pagado: {
        type: "boolean",
    },
    invitado_por: {
        type: "number",
    }
  },
  additionalProperties: false,
};