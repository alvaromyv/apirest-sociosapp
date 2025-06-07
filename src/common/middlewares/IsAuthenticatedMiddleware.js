const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/config");

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // IF no auth headers are provided
    // THEN return 401 Unauthorized error
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        error: {
          message: req.__("error.auth_cabecera_no_proporcionada")
        }
      });
    }

    // IF bearer auth header is not provided
    // THEN return 401 Unauthorized error
    if (!authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        status: "error",
        error: {
          message: req.__("error.auth_mecanismo_no_valido")
        }
      });
    }

    const token = authHeader.split(' ')[1];

    // IF bearer auth header is provided, but token is not provided
    // THEN return 401 Unauthorized error
    if (!token) {
      return res.status(401).json({
        status: "error",
        error: {
          message: req.__("error.auth_token_faltante")
        }
      })
    }

    jwt.verify(token, jwtSecret, (err, usuario) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          error: req.__("error.auth_token_no_valido")
        });
      }

      req.usuario = usuario; // Save the user object for further use
      next();
    });
  }
}