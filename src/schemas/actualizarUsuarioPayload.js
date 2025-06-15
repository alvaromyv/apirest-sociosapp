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
      type: ['string', 'null'] 
    },
    telefono: {
      type: ['string', 'null'] 
    },
    email: {
      type: 'string'
    },
    rol: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  additionalProperties: false
};