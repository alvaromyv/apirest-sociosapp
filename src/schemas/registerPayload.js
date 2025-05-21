const { roles } = require('../../config/config');

module.exports = {
  type: 'object',
  properties: {
    nombre: {
      type: 'string'
    },
    apellidos: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
    },
    password: {
      type: 'string'
    },
    rol: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  required: [
    'nombre',
    'apellidos',
    'email',
    'password',
  ],
  additionalProperties: false
};