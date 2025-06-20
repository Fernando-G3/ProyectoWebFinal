const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  
  const User = sequelize.define('User', {
    idUser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserType',
        key: 'idUserType'
      }
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false
  });

  User.associate = function (models) {
    User.belongsTo(models.UserType, { foreignKey: 'typeUser', as: 'userType' });
  };

  return User;
};
