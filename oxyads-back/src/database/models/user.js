'use strict';
const {
  Model,
} = require('sequelize');
const {comparePassword} = require('../../util/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      activation_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reset_password_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      remember_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email_verified_at: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: 1,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      activated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      banned_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      wallet_balance: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      discount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      is_pro: {
        type: DataTypes.BOOLEAN,
        field: 'is_pro',
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'users',
    },
  );

  User.prototype.removePrivateFields = function (fields) {
    for (const field of fields) {
      delete this.dataValues[field];
    }
  };

  User.prototype.comparePassword = async function (password) {
    if (this.dataValues.password) {
      return comparePassword(password, this.dataValues.password);
    }
    return false;
  };

  User.associate = (models) => {
    User.belongsToMany(models.seller, {
      foreignKey: 'userId',
      // through: "users_has_sellers",
      through: models.userSeller,
      as: 'sellers'
    });


  };



  return User;
};