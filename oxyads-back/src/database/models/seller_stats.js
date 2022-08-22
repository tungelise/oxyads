'use strict';

module.exports = (sequelize, DataTypes) => {
  const SellerStats = sequelize.define('seller_stats',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      feedback: {
        type: DataTypes.INTEGER
      },
      sellers_id: {
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
      tableName: 'seller_stats',
      indexes: [
        {
          fields: ['sellers_id']
        }
      ],
    },
  );

  SellerStats.associate = (models) => {
    SellerStats.belongsTo(models.seller, {
      foreignKey: 'sellers_id',
      onDelete: 'CASCADE',
      as: 'seller'
    });
  };

  return SellerStats;
};