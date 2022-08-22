'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('process_status',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      job_type: {
        type: DataTypes.STRING,
        maxlength: 45,
        allowNull: true,
      },
      job_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      process_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      started_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      end_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'process_status',
    },
  );
};