const Song = require('../models/Song');
const Artist = require('../models/Artist');

// @desc    Get all songs
// @route   GET /api/songs
// @access  Public
const getSongs = async (req, res) => {
  try {
    const songs = await Song.findAll({
      include: [
        {
          model: Artist,
          as: 'artist',
          attributes: ['id', 'name', 'image'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({
      success: true,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get songs by artist
// @route   GET /api/songs/artist/:artistId
// @access  Public
const getSongsByArtist = async (req, res) => {
  try {
    const songs = await Song.findAll({
      where: { artistId: req.params.artistId },
      include: [
        {
          model: Artist,
          as: 'artist',
          attributes: ['id', 'name', 'image'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({
      success: true,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single song
// @route   GET /api/songs/:id
// @access  Public
const getSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id, {
      include: [
        {
          model: Artist,
          as: 'artist',
          attributes: ['id', 'name', 'image'],
        },
      ],
    });

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found',
      });
    }

    res.json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new song
// @route   POST /api/songs
// @access  Private/Admin
const createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);

    res.status(201).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update song
// @route   PUT /api/songs/:id
// @access  Private/Admin
const updateSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found',
      });
    }

    await song.update(req.body);
    await song.reload();

    res.json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete song
// @route   DELETE /api/songs/:id
// @access  Private/Admin
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found',
      });
    }

    await song.destroy();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSongs,
  getSongsByArtist,
  getSong,
  createSong,
  updateSong,
  deleteSong,
};
