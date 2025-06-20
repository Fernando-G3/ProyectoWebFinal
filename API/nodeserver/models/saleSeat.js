const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const SaleSeat = sequelize.define('SaleSeat', {
    idSaleSeat: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idSection: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Section',
        key: 'idSaleSection'
      }
    },
    seat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idSale: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sale',
        key: 'idSale'
      }
    }
  }, {
    sequelize,
    tableName: 'SaleSeat',
    timestamps: false
  });

  SaleSeat.associate = function (models) {
    SaleSeat.belongsTo(models.Section, { foreignKey: 'idSection', as: 'section' });
    SaleSeat.belongsTo(models.Sale, { foreignKey: 'idSale', as: 'sale' });
  };

  return SaleSeat;
};
