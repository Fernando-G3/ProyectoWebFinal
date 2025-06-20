const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const EventImages = sequelize.define('EventImages', {
    idImage: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idEvent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Event',
        key: 'idEvent'
      }
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileType: {
      type: DataTypes.ENUM('Promocional', 'Mapa'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'EventImages',
    timestamps: false
  });

  EventImages.associate = function (models) {
    EventImages.belongsTo(models.Event, { foreignKey: 'idEvent', as: 'event' });
  };

  return EventImages;
};
