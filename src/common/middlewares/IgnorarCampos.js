const ignorarCampos = (...campos) => (req, res, next) => {
  campos.forEach((campo) => delete req.body[campo]);
  next();
};

module.exports = ignorarCampos;