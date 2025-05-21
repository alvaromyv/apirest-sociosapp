const { roles } = require('../../config/config');

module.exports = {
  type: 'object',
  properties: {
    role: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  additionalProperties: false
};