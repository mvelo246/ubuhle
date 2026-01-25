const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Song = sequelize.define(
  'Song',
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
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artists',
        key: 'id',
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // in seconds
    },
  },
  {
    tableName: 'songs',
    timestamps: true,
  }
);

// Define associations
const Artist = require('./Artist');
Song.belongsTo(Artist, { foreignKey: 'artistId', as: 'artist' });
Artist.hasMany(Song, { foreignKey: 'artistId', as: 'songs' });

module.exports = Song;
