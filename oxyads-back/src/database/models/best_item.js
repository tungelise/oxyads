'use strict';

module.exports = (sequelize, DataTypes) => {
  const BestItem = sequelize.define('best_item',
    {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        primaryKey: true
      },
      itemId: {
        type: DataTypes.INTEGER,
        field: 'item_id',
        primaryKey: true
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
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'best_item',
    },
  );

  BestItem.associate = (models) => {
    BestItem.belongsTo(models.item, {
      foreignKey: 'item_id',
      as: 'item'
    });
  };

  return BestItem;
};