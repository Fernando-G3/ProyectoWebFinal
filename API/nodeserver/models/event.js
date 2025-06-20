// models/Event.js
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    idEvent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eventName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    eventLocation: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    eventCity: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    accesibility: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isAvailable: {
      type: DataTypes.ENUM('Activo', 'Cancelado', 'Expirado'),
      allowNull: false
    },
    idOwner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
      }
    },
    eventMap: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    eventPromotional: {
      type: DataTypes.BLOB,
      allowNull: false
    }
  }, {
    tableName: 'event',
    timestamps: false
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: 'idOwner', targetKey: 'idUser' });
  };

  return Event;
};
