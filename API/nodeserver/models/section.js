const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Section = sequelize.define('Section', {
    idSaleSection: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    idEvent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event',
        key: 'idEvent'
      }
    }
  }, {
    sequelize,
    tableName: 'section',
    timestamps: false
  });

  Section.associate = function (models) {
    Section.belongsTo(models.Event, { foreignKey: 'idEvent', as: 'event' });
  };

  return Section;
};
