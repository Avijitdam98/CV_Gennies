const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getDashboardAnalytics,
  getUsers,
  updateUser,
  getSubscriptionAnalytics
} = require('../controllers/adminController');

router.use(protect, admin);

router.get('/analytics', getDashboardAnalytics);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.get('/subscriptions/analytics', getSubscriptionAnalytics);

module.exports = router;
