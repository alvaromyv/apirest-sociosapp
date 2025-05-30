const { DataTypes } = require("sequelize");
const { roles } = require("../../../config/config");

const UsuarioModel = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  avatarUrl: { type: DataTypes.STRING,  allowNull: true},
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: true },
  telefono: { type: DataTypes.STRING, allowNull: true },
  correo: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.STRING, allowNull: false, defaultValue: roles.USER }
};

module.exports = {
  inicializar: (sequelize) => {
    this.model = sequelize.define("usuario", UsuarioModel);
  },

  crearUsuario: (usuario) => {
    return this.model.create(usuario);
  },

  encontrarUsuario: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  actualizarUsuario: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  obtenerUsuarios: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  eliminarUsuario: (query) => {
    return this.model.destroy({
      where: query
    });
  }
};