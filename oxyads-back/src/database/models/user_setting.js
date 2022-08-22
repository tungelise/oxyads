'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserSetting = sequelize.define('user_setting',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      currency: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      view_rule: {
        type: DataTypes.STRING,
      },
      sold_rule: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER
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
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'user_setting',
    },
  );

  UserSetting.associate = (models) => {
    UserSetting.belongsTo(models.user, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user'
    });
  };

  return UserSetting;
};