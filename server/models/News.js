const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const News = sequelize.define(
  'News',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    link: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  },
  {
    tableName: 'news',
    timestamps: true,
  }
);

module.exports = News;
