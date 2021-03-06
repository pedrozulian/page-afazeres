'use strict';

const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.ListFlashcard,       { foreignKey: 'id_user' });
      User.hasMany(models.FolderListFlashcard, { foreignKey: 'id_user' });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  });

  User.beforeBulkUpdate(async (user) => {
    if (user.attributes.password) {
      user.attributes.password = await bcrypt.hash(user.attributes.password, 8);
    }
  });

  User.prototype.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};