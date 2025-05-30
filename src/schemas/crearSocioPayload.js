const { categorias } = require("../../config/config");
module.exports = {
  type: "object",
  properties: {
    categoria: {
        type: "string",
        enum: Object.values(categorias),
    },
    fecha_nacimiento: {
        type: "string",
        format: "date",
    },
    fecha_antiguedad: {
        type: "string",
        format: "date",
    },
    abonado: {
        type: "boolean",
    },
    usuario_id: {
         type: "number",
    }
  },
  required: ["categoria", "fecha_nacimiento", "fecha_antiguedad", "abonado"],
  additionalProperties: false,
};