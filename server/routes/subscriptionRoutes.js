const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getSubscriptionStatus,
  upgradeSubscription,
  checkSubscriptionAccess,
  cancelSubscription
} = require('../controllers/subscriptionController');

router.get('/status', protect, getSubscriptionStatus);
router.post('/upgrade', protect, upgradeSubscription);
router.get('/check-access', protect, checkSubscriptionAccess);
router.post('/cancel', protect, cancelSubscription);

module.exports = router;
