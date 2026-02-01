const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Artist = sequelize.define(
  'Artist',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    socialLinks: {
      type: DataTypes.JSONB,
      defaultValue: {
        facebook: '',
        instagram: '',
        twitter: '',
        tiktok: '',
      },
    },
  },
  {
    tableName: 'artists',
    timestamps: true,
  }
);

module.exports = Artist;
