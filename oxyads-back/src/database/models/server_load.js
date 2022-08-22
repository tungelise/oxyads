'use strict';

module.exports = (sequelize, DataTypes) => {
  const ServerLoad = sequelize.define('server_load',
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
      url: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      },
      ram: {
        type: DataTypes.INTEGER
      },
      cpu: {
        type: DataTypes.DOUBLE
      },
      nb_cpu: {
        type: DataTypes.INTEGER
      },
      load: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: true,
      },
      load_rate: {
        type: DataTypes.DOUBLE,
        field: 'load_rate',
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
      deleted: {
        type: DataTypes.BOOLEAN,
        field: 'deleted',
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'server_load',
    },
  );

  return ServerLoad;
};