const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Sale = sequelize.define('Sale', {
    idSale: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'idUser'
      }
    },
    idEvent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Event',
        key: 'idEvent'
      }
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    order: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typePayment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Sale',
    timestamps: false
  });

  Sale.associate = function (models) {
    Sale.belongsTo(models.User, { foreignKey: 'idClient', as: 'client' });
    Sale.belongsTo(models.Event, { foreignKey: 'idEvent', as: 'event' });
  };

  return Sale;
};
