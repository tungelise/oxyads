'use strict';

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('cities_all',
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
      country_id: {
        type: DataTypes.INTEGER
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
      nb_fedex: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'nb_fedex',
      },
      nb_dhl: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'nb_dhl',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'cities_all',
    },
  );

  return City;
};