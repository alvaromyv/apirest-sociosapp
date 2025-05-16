const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config");

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // IF no auth headers are provided
    // THEN return 401 Unauthorized error
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Cabecera de autenticación no proporcionado en la solicitud.'
        }
      });
    }

    // IF bearer auth header is not provided
    // THEN return 401 Unauthorized error
    if (!authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Mecanismo de autenticación no válido.'
        }
      });
    }

    const token = authHeader.split(' ')[1];

    // IF bearer auth header is provided, but token is not provided
    // THEN return 401 Unauthorized error
    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Falta el token de autenticación en las cabeceras de autorización.'
        }
      })
    }

    jwt.verify(token, jwtSecret, (err, usuario) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: "El token de acceso proporcionado no es válido, por favor inicie sesión de nuevo."
        });
      }

      req.usuario = usuario; // Save the user object for further use
      next();
    });
  }
}