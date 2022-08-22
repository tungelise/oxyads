'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('categories',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING
      },
      ebay_id: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.BOOLEAN,
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
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'categories',
    },
  );

  return Category;
};