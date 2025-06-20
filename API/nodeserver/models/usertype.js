const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const UserType = sequelize.define('UserType', {
    idUserType: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usertype',
    timestamps: false
  });

  UserType.associate = function (models) {
    // UserType hasMany User
    UserType.hasMany(models.User, { foreignKey: 'typeUser', as: 'users' });
  };

  return UserType;
};