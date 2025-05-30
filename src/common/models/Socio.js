const { DataTypes } = require("sequelize");
const { categorias } = require("../../../config/config");

const SocioModel = {
    n_socio: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    fecha_nacimiento: { type: DataTypes.DATE, allowNull: false},
    fecha_antiguedad: { type: DataTypes.DATE, allowNull: false },
    cuota: { type: DataTypes.DOUBLE, allowNull: false },
    categoria: { type: DataTypes.ENUM(...Object.values(categorias)), allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    abonado: { type: DataTypes.BOOLEAN, defaultValue: false },
    invitado_por: {
        type: DataTypes.INTEGER,
        references: {
            model: 'socios',
            key: 'id'
        },
        allowNull: true
    },
    usuario_id: {   
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'usuarios', key: 'id' }
    }
};


module.exports = {
  inicializar: (sequelize) => {
    this.sequelize = sequelize;
    this.model = sequelize.define("socio", SocioModel)

    this.model.belongsTo(this.model, {
      foreignKey: "invitado_por",
      as: "invitador",
      onDelete: "SET NULL",
    });

    this.model.hasMany(this.model, {
        foreignKey: "invitado_por",
        as: "invitaciones",
        onDelete: "SET NULL",
    });
  },

  crearSocio: (socio) => {
    return this.model.max('n_socio')
      .then(maxNsocio => {
        const n = maxNsocio + 1;
        return this.model.create({...socio, n_socio: n});
      });
  },

  encontrarSocio: (query) => {
    return this.model.findOne({
      where: query,
      include: [
        { model: this.model, as: "invitador" }, 
        { model: this.model, as: "invitaciones" },
      ]
    });
  },

  actualizarSocio: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  obtenerSocios: (query, order = [['antiguedad', 'DESC']]) => {
    return this.model.findAndCountAll({
      where: query,
      order: order,
    });
  },

  eliminarSocio: (query) => {
    return this.model.destroy({
      where: query
    });
  }
}