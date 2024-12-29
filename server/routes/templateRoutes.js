const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  getTemplateStats
} = require('../controllers/templateController');

// Public routes
router.get('/', getTemplates);
router.get('/:id', getTemplateById);

// Admin routes
router.use(protect, admin);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);
router.get('/stats/usage', getTemplateStats);

module.exports = router;
