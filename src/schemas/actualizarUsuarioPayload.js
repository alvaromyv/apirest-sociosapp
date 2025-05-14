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
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  additionalProperties: false
};