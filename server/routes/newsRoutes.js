const express = require('express');
const router = express.Router();
const {
  getNews,
  getNewsItem,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getNews);
router.get('/:id', getNewsItem);
router.post('/', protect, adminOnly, createNews);
router.put('/:id', protect, adminOnly, updateNews);
router.delete('/:id', protect, adminOnly, deleteNews);

module.exports = router;
