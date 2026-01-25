const express = require('express');
const router = express.Router();
const {
  getModels,
  getModel,
  createModel,
  updateModel,
  deleteModel,
} = require('../controllers/modelController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getModels);
router.get('/:id', getModel);
router.post('/', protect, adminOnly, createModel);
router.put('/:id', protect, adminOnly, updateModel);
router.delete('/:id', protect, adminOnly, deleteModel);

module.exports = router;
