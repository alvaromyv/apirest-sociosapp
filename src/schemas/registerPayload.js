const { roles } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
    },
    password: {
      type: 'string'
    },
    role: {
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