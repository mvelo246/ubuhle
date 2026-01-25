const Model = require('../models/Model');

// @desc    Get all models
// @route   GET /api/models
// @access  Public
const getModels = async (req, res) => {
  try {
    const models = await Model.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json({
      success: true,
      count: models.length,
      data: models,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single model
// @route   GET /api/models/:id
// @access  Public
const getModel = async (req, res) => {
  try {
    const model = await Model.findByPk(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Model not found',
      });
    }

    res.json({
      success: true,
      data: model,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new model
// @route   POST /api/models
// @access  Private/Admin
const createModel = async (req, res) => {
  try {
    const model = await Model.create(req.body);

    res.status(201).json({
      success: true,
      data: model,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update model
// @route   PUT /api/models/:id
// @access  Private/Admin
const updateModel = async (req, res) => {
  try {
    const model = await Model.findByPk(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Model not found',
      });
    }

    await model.update(req.body);
    await model.reload();

    res.json({
      success: true,
      data: model,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete model
// @route   DELETE /api/models/:id
// @access  Private/Admin
const deleteModel = async (req, res) => {
  try {
    const model = await Model.findByPk(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Model not found',
      });
    }

    await model.destroy();

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
  getModels,
  getModel,
  createModel,
  updateModel,
  deleteModel,
};
