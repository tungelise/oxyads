'use strict';

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('items',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      ebay_id: {
        type: DataTypes.STRING,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      currency: {
        type: DataTypes.STRING,
      },
      sellers_id: {
        type: DataTypes.INTEGER
      },
      upload_date: {
        type: DataTypes.DATE,
      },
      views: {
        type: DataTypes.INTEGER,
      },
      sold: {
        type: DataTypes.INTEGER,
      },
      photo: {
        type: DataTypes.STRING,
      },
      last_crawled_at: {
        type: DataTypes.BIGINT,
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
      indexes: [
        {
          fields: ['sellers_id']
        }
      ],
      tableName: 'items',
    },
  );

  Item.associate = (models) => {
    Item.belongsTo(models.seller, {
      foreignKey: 'sellers_id',
      onDelete: 'CASCADE',
      as: 'seller'
    });

    Item.belongsTo(models.category, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
      as: 'category'
    });

    Item.hasMany(models.itemStats, {
      foreignKey: 'item_id',
      as: 'stats',
    });

    
  };

  return Item;
};