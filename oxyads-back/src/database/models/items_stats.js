'use strict';

module.exports = (sequelize, DataTypes) => {
  const ItemStats = sequelize.define('item_stats',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      item_id: {
        type: DataTypes.INTEGER
      },
      views: {
        type: DataTypes.INTEGER
      },
      sold: {
        type: DataTypes.INTEGER
      },
      available: {
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
      tableName: 'item_stats',
      indexes: [
        {
          fields: ['item_id']
        }
      ],
    },
  );

  ItemStats.associate = (models) => {
    ItemStats.belongsTo(models.item, {
      foreignKey: 'item_id',
      onDelete: 'CASCADE',
      as: 'item'
    });
  };

  return ItemStats;
};