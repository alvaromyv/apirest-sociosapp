const { roles } = require('../../config/config');

module.exports = {
  type: 'object',
  properties: {
    avatar_url: {
      type: 'string'
    },
    nombre: {
      type: 'string'
    },
    apellidos: {
      type: 'string'
    },
    telefono: {
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
    'email',
    'password',
    'rol'
  ],
  additionalProperties: true
};