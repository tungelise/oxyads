'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserSeller = sequelize.define('users_has_sellers',
    {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        primaryKey: true
      },
      sellerId: {
        type: DataTypes.INTEGER,
        field: 'seller_id',
        primaryKey: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        field: 'active'
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'users_has_sellers',
    },
  );

  UserSeller.associate = (models) => {
    UserSeller.belongsTo(models.seller, {
      foreignKey: 'seller_id',
      as: 'seller'
    });
  };

  return UserSeller;
};