const express = require('express');
const router = express.Router();
const {
  getSongs,
  getSongsByArtist,
  getSong,
  createSong,
  updateSong,
  deleteSong,
} = require('../controllers/songController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/artist/:artistId', getSongsByArtist);
router.get('/', getSongs);
router.get('/:id', getSong);
router.post('/', protect, adminOnly, createSong);
router.put('/:id', protect, adminOnly, updateSong);
router.delete('/:id', protect, adminOnly, deleteSong);

module.exports = router;
