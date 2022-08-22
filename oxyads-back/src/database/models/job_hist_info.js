'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('job_hist_info',
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
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      last_keyword_item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      last_stat_item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      tableName: 'job_hist_info',
    },
  );
};