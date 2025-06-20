const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Seat = sequelize.define('Seat', {
    idSeat: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idSection: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'section',
        key: 'idSaleSection'
      }
    },
    isAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'seat',
    timestamps: false
  });

  Seat.associate = function (models) {
    Seat.belongsTo(models.Section, { foreignKey: 'idSection', as: 'section' });
  };

  return Seat;
};
