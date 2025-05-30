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
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  additionalProperties: false
};