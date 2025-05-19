const { categorias } = require("../../config");

module.exports = {
  type: "object",
  properties: {
    nombre: {
        type: "string",
    },
    apellidos: {
        type: "string",
    },
    telefono: {
        type: "string",
    },
    email: {
        type: "string",
        format: "email"
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