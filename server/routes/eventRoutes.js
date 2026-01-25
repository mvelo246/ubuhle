const express = require('express');
const router = express.Router();
const {
  getEvents,
  getUpcomingEvents,
  getPastEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/upcoming', getUpcomingEvents);
router.get('/past', getPastEvents);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', protect, adminOnly, createEvent);
router.put('/:id', protect, adminOnly, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

module.exports = router;
