'use strict';

module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('sellers',
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
      isCommon: {
        type: DataTypes.BOOLEAN,
        field: 'is_common',
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'sellers',
    },
  );

  Seller.associate = (models) => {
    Seller.belongsToMany(models.user, {
      foreignKey: 'sellerId',
      // through: "users_has_sellers",
      through: models.userSeller,
      as: 'users'
    });

    Seller.hasMany(models.userSeller, {
      as: 'userSellers',
    });
  };

  return Seller;
};