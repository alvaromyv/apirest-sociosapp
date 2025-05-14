const { DataTypes } = require("sequelize");
const { categoriaValues } = require("../../../config");

const SocioModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    n_socio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    categoria: {
        type: DataTypes.ENUM(...Object.values(categoriaValues)),
        allowNull: false,
    },
    antiguedad: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cuota: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.00
    },
    abonado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    pagado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    invitado_por: {
        type: DataTypes.INTEGER,
        references: {
            model: 'socios',
            key: 'id'
        },
        allowNull: true
    }
};


module.exports = {
  inicializar: (sequelize) => {
    this.model = sequelize.define("socio", SocioModel)
  },

  crearSocio: (socio) => {
    /*const n = (this.model.count()) + 1
    return this.model.create({...socio, n_socio: n});*/
    return this.model.create(socio);
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

  obtenerSocios: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  eliminarSocio: (query) => {
    return this.model.destroy({
      where: query
    });
  }
}