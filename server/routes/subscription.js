const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Subscription = require('../models/Subscription');

// Get subscription status
router.get('/status', protect, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    const subscription = await Subscription.findOne({ userId: req.user.id });
    
    return res.json({
      success: true,
      type: subscription?.type || 'free',
      status: subscription?.status || 'active',
      features: subscription?.features || {
        maxResumes: 1,
        premiumTemplates: false,
        removeWatermark: false,
        analytics: false,
        prioritySupport: false,
        customDomain: false
      }
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching subscription status'
    });
  }
});

// Webhook endpoint for payment success
router.post('/webhook', async (req, res) => {
  try {
    const { payment_id, order_id, user_id } = req.body;

    // Validate the payment with Razorpay (you should add proper validation)
    
    // Update user's subscription
    const subscription = await Subscription.findOneAndUpdate(
      { userId: user_id },
      {
        type: 'pro',
        status: 'active',
        paymentId: payment_id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        features: {
          maxResumes: Infinity,
          premiumTemplates: true,
          removeWatermark: true,
          analytics: true,
          prioritySupport: true,
          customDomain: true
        }
      },
      { upsert: true, new: true }
    );

    return res.json({
      success: true,
      message: 'Subscription updated successfully',
      data: subscription
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing webhook'
    });
  }
});

module.exports = router;
