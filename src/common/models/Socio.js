const { DataTypes } = require("sequelize");
const { categorias } = require("../../../config/config");

const SocioModel = {
  n_socio: { type: DataTypes.INTEGER, allowNull: false},
  fecha_nacimiento: { type: DataTypes.DATE, allowNull: false},
  fecha_antiguedad: { type: DataTypes.DATE, allowNull: false },
  categoria: { type: DataTypes.ENUM(...Object.values(categorias)), allowNull: false },
  abonado: { type: DataTypes.BOOLEAN, defaultValue: false },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'usuarios', key: 'id' }, unique: true}
};


module.exports = {
  inicializar: (sequelize) => {
    this.model = sequelize.define("socio", SocioModel)
  },

  crearSocio: (socio) => {
    return this.model.max('n_socio')
      .then(maxNsocio => {
        const n = (maxNsocio ?? 0) + 1;
        return this.model.create({...socio, n_socio: n});
      });
  },

  encontrarSocio: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  actualizarSocio: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  obtenerSocios: (query, order = [['fecha_antiguedad', 'DESC']]) => {
    return this.model.findAndCountAll({
      where: query,
      order: order,
      include: [
        {
          model: this.model.sequelize.models.usuario,
          as: 'usuario',
        }
      ]
    });
  },

  eliminarSocio: (query) => {
    return this.model.destroy({
      where: query
    });
  }
}