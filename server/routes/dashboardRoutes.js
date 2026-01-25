const express = require('express');
const router = express.Router();
const { getStats, getRecent } = require('../controllers/dashboardController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/stats', protect, adminOnly, getStats);
router.get('/recent', protect, adminOnly, getRecent);

module.exports = router;
