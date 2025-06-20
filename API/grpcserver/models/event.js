// models/Event.js
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    eventCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    idOwner: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'events',
    timestamps: false
  });

  return Event;
};
