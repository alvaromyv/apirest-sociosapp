const { DataTypes } = require("sequelize");
const { categorias } = require("../../../config");

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
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    categoria: {
        type: DataTypes.ENUM(...Object.values(categorias)),
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
    return this.model.findAll({
      where: query,
      order: order,
    });
  },

obtenerContabilidad: () => {
    return this.model.findAll({
      attributes: [
        [this.sequelize.fn('SUM', this.sequelize.col('cuota')), 'total'],
        [this.sequelize.literal('SUM(CASE WHEN pagado = true THEN cuota ELSE 0 END)'), 'pagado'],
        [this.sequelize.literal('SUM(CASE WHEN pagado = false THEN cuota ELSE 0 END)'), 'impagado']
      ],
      raw: true
    }).then(([result]) => {
      const totalNum = parseFloat(result.total) || 0;
      const pagadoNum = parseFloat(result.pagado) || 0;
      const impagadoNum = parseFloat(result.impagado) || 0;
      const porcentajePagado = totalNum > 0 ? (pagadoNum / totalNum) * 100 : 0;
      const balance = pagadoNum - impagadoNum;

      return {
        total: totalNum,
        pagado: pagadoNum,
        impagado: impagadoNum,
        porcentaje_pagado: Number(porcentajePagado.toFixed(2)),
        balance: balance,
      };
    });
  },

  eliminarSocio: (query) => {
    return this.model.destroy({
      where: query
    });
  }

}