const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UsuarioModel = require("../common/models/Usuario");

const { roles, jwtSecret, jwtExpirationInSeconds } = require("../../config/config");

// Generates an Access Token using email and id for the user's authentication
const generateAccessToken = (email, id) => {
  return jwt.sign(
    {
      id,
      email,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

// Encrypts the password using SHA256 Algorithm, for enhanced security of the password
const encryptPassword = (password) => {
  // We will hash the password using SHA256 Algorithm before storing in the DB
  // Creating SHA-256 hash object
  const hash = crypto.createHash("sha256");
  // Update the hash object with the string to be encrypted
  hash.update(password);
  // Get the encrypted value in hexadecimal format
  return hash.digest("hex");
};

module.exports = {
  register: (req, res) => {
    const payload = req.body;

    let encryptedPassword = encryptPassword(payload.password);
    let role = payload.role;

    if (!role) {
      role = roles.USER;
    }

    UsuarioModel.crearUsuario(
      Object.assign(payload, { password: encryptedPassword, role })
    )
      .then((user) => {
        // Generating an AccessToken for the user, which will be
        // required in every subsequent request.
        const accessToken = generateAccessToken(payload.email, user.id);

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {

        console.log(err)

        return res.status(500).json({
          status: false,
          error: {
            message: req.__("error.crear_usuario", req.__("error.reintentar"))
          },
        });
      });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    UsuarioModel.obtenerUsuarioActual({ email })
      .then((user) => {
        // IF user is not found with the given email
        // THEN Return user not found error
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: req.__("error.email_no_existe", email )
            },
          });
        }

        const encryptedPassword = encryptPassword(password);

        // IF Provided password does not match with the one stored in the DB
        // THEN Return password mismatch error
        if (user.password !== encryptedPassword) {
          return res.status(400).json({
            status: false,
            error: {
              message: req.__("error.email_password_no_coinciden"),
            },
          });
        }

        // Generating an AccessToken for the user, which will be
        // required in every subsequent request.
        const accessToken = generateAccessToken(user.email, user.id);
        const decoded = jwt.decode(accessToken); // Decodificamos el token
        const exp = decoded.exp; // Hora exacta a la que el token caduca

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
            expiresIn: exp
          },
        });
      })
      .catch((err) => {

        console.log(err)

        return res.status(500).json({
          status: false,
          error: {
              message: req.__("fallo_servidor" , req.__("reintentar")),
            },
        });
      });
  },
};