const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Model = sequelize.define(
  'Model',
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
      type: DataTypes.STRING,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        isValidEmail(value) {
          if (value && value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(value)) {
              throw new Error('Please provide a valid email address')
            }
          }
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    gallery: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
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
    tableName: 'models',
    timestamps: true,
  }
);

module.exports = Model;
