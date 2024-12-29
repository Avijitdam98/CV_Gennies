const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  recordActivity,
  getUserActivity,
  getPlatformStats,
  getConversionMetrics
} = require('../controllers/analyticsController');

// Protected routes
router.post('/activity', protect, recordActivity);

// Admin routes
router.use(protect, admin);
router.get('/activity/:userId', getUserActivity);
router.get('/stats', getPlatformStats);
router.get('/conversions', getConversionMetrics);

module.exports = router;
