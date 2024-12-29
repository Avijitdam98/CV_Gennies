const Template = require('../models/Template');
const Resume = require('../models/Resume');
const asyncHandler = require('express-async-handler');

// @desc    Create a new template
// @route   POST /api/templates
// @access  Admin
const createTemplate = asyncHandler(async (req, res) => {
  const { name, description, thumbnail, html, css, isActive, isPremium } = req.body;

  const template = await Template.create({
    name,
    description,
    thumbnail,
    html,
    css,
    isActive,
    isPremium
  });

  res.status(201).json({
    success: true,
    data: template
  });
});

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
const getTemplates = asyncHandler(async (req, res) => {
  const templates = await Template.find({ isActive: true });

  res.status(200).json({
    success: true,
    data: templates
  });
});

// @desc    Get template by ID
// @route   GET /api/templates/:id
// @access  Public
const getTemplateById = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    res.status(404);
    throw new Error('Template not found');
  }

  res.status(200).json({
    success: true,
    data: template
  });
});

// @desc    Update template
// @route   PUT /api/templates/:id
// @access  Admin
const updateTemplate = asyncHandler(async (req, res) => {
  const { name, description, thumbnail, html, css, isActive, isPremium } = req.body;

  const template = await Template.findById(req.params.id);

  if (!template) {
    res.status(404);
    throw new Error('Template not found');
  }

  template.name = name || template.name;
  template.description = description || template.description;
  template.thumbnail = thumbnail || template.thumbnail;
  template.html = html || template.html;
  template.css = css || template.css;
  template.isActive = isActive !== undefined ? isActive : template.isActive;
  template.isPremium = isPremium !== undefined ? isPremium : template.isPremium;

  const updatedTemplate = await template.save();

  res.status(200).json({
    success: true,
    data: updatedTemplate
  });
});

// @desc    Delete template
// @route   DELETE /api/templates/:id
// @access  Admin
const deleteTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    res.status(404);
    throw new Error('Template not found');
  }

  // Check if template is being used by any resumes
  const usedByResumes = await Resume.exists({ template: req.params.id });

  if (usedByResumes) {
    res.status(400);
    throw new Error('Template is being used by resumes and cannot be deleted');
  }

  await template.remove();

  res.status(200).json({
    success: true,
    message: 'Template deleted successfully'
  });
});

// @desc    Get template usage statistics
// @route   GET /api/templates/stats
// @access  Admin
const getTemplateStats = asyncHandler(async (req, res) => {
  const stats = await Resume.aggregate([
    {
      $group: {
        _id: '$template',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'templates',
        localField: '_id',
        foreignField: '_id',
        as: 'templateInfo'
      }
    },
    {
      $unwind: '$templateInfo'
    },
    {
      $project: {
        _id: 1,
        count: 1,
        name: '$templateInfo.name',
        isPremium: '$templateInfo.isPremium'
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: stats
  });
});

module.exports = {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  getTemplateStats
};
