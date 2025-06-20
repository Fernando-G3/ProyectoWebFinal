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
        model: 'Section',
        key: 'idSaleSection'
      }
    }
  }, {
    sequelize,
    tableName: 'Seat',
    timestamps: false
  });

  Seat.associate = function (models) {
    Seat.belongsTo(models.Section, { foreignKey: 'idSection', as: 'section' });
  };

  return Seat;
};
