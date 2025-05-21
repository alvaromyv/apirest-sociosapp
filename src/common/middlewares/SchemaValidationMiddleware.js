const Ajv = require('ajv').default,
  AJV_OPTS = {allErrors: true};

  const addFormats = require("ajv-formats")

module.exports = {

  /**
   * @description Compiles the schema provided in argument and validates the data for the
   * compiled schema, and returns errors if any
   *
   * @param {Object} schema - AJV Schema to validate against
   *
   * @returns {Function} - Express request handler
   */
  verify: (schema) => {
    if (!schema) {
      throw new Error(req.__("error.esquema_no_proporcionado"));
    }

    return (req, res, next) => {
      const { body } = req;
      const ajv = new Ajv(AJV_OPTS);
      addFormats(ajv)
      
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (isValid) {
        return next();
      }

      return res.send({
        status: false,
        error: {
          message: req.__("error.payload_no_valido", ajv.errorsText(validate.errors))
        },
      });
    }
  }
};