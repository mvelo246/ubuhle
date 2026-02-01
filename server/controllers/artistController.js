const Artist = require('../models/Artist');

// @desc    Get all artists
// @route   GET /api/artists
// @access  Public
const getArtists = async (res) => {
  try {
    const artists = await Artist.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json({
      success: true,
      count: artists.length,
      data: artists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single artist
// @route   GET /api/artists/:id
// @access  Public
const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    res.json({
      success: true,
      data: artist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new artist
// @route   POST /api/artists
// @access  Private/Admin
const createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);

    res.status(201).json({
      success: true,
      data: artist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update artist
// @route   PUT /api/artists/:id
// @access  Private/Admin
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    await artist.update(req.body);
    await artist.reload();

    res.json({
      success: true,
      data: artist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete artist
// @route   DELETE /api/artists/:id
// @access  Private/Admin
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    await artist.destroy();

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
  getArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};
