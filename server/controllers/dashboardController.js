const Artist = require('../models/Artist');
const Model = require('../models/Model');
const Event = require('../models/Event');
const Song = require('../models/Song');
const News = require('../models/News');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const [
      totalArtists,
      totalModels,
      totalEvents,
      upcomingEvents,
      totalSongs,
      totalNews,
    ] = await Promise.all([
      Artist.count(),
      Model.count(),
      Event.count(),
      Event.count({ where: { status: 'upcoming' } }),
      Song.count(),
      News.count(),
    ]);

    res.json({
      success: true,
      data: {
        totalArtists,
        totalModels,
        totalEvents,
        upcomingEvents,
        totalSongs,
        totalNews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get recent activity
// @route   GET /api/dashboard/recent
// @access  Private/Admin
const getRecent = async (req, res) => {
  try {
    const [recentArtists, recentModels, recentEvents] = await Promise.all([
      Artist.findAll({
        order: [['createdAt', 'DESC']],
        limit: 3,
      }),
      Model.findAll({
        order: [['createdAt', 'DESC']],
        limit: 2,
      }),
      Event.findAll({
        order: [['createdAt', 'DESC']],
        limit: 2,
      }),
    ]);

    const recentItems = [
      ...recentArtists.map((a) => ({ ...a.toJSON(), type: 'artist' })),
      ...recentModels.map((m) => ({ ...m.toJSON(), type: 'model' })),
      ...recentEvents.map((e) => ({ ...e.toJSON(), type: 'event' })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
      success: true,
      data: recentItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
  getRecent,
};
