const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createShareableLink,
  getSharedResume,
  deactivateShareableLink,
  getShareStats
} = require('../controllers/shareController');

router.post('/resume/:resumeId', protect, createShareableLink);
router.get('/:token', getSharedResume);
router.delete('/resume/:resumeId', protect, deactivateShareableLink);
router.get('/stats/:resumeId', protect, getShareStats);

module.exports = router;
