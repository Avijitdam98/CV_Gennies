const Subscription = require('../models/Subscription');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get user's subscription status
// @route   GET /api/subscriptions/status
// @access  Private
const getSubscriptionStatus = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ userId: req.user.id });
  
  if (!subscription) {
    // Create a free subscription if none exists
    const newSubscription = await Subscription.create({
      userId: req.user.id,
      type: 'free',
      endDate: null,
      features: {
        maxResumes: 3,
        premiumTemplates: false,
        removeWatermark: false
      }
    });
    return res.status(200).json({ subscription: newSubscription });
  }

  res.status(200).json({ subscription });
});

// @desc    Update subscription after successful payment
// @route   POST /api/subscriptions/upgrade
// @access  Private
const upgradeSubscription = asyncHandler(async (req, res) => {
  const { paymentId } = req.body;

  const subscription = await Subscription.findOne({ userId: req.user.id });

  if (!subscription) {
    return res.status(404).json({ message: 'Subscription not found' });
  }

  // Calculate end date (30 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  // Update subscription to pro
  subscription.type = 'pro';
  subscription.paymentId = paymentId;
  subscription.startDate = new Date();
  subscription.endDate = endDate;
  subscription.status = 'active';
  subscription.features = {
    maxResumes: -1, // Unlimited
    premiumTemplates: true,
    removeWatermark: true
  };

  await subscription.save();

  res.status(200).json({ subscription });
});

// @desc    Check subscription access
// @route   GET /api/subscriptions/check-access
// @access  Private
const checkSubscriptionAccess = asyncHandler(async (req, res) => {
  const { feature } = req.query;
  const subscription = await Subscription.findOne({ userId: req.user.id });

  if (!subscription) {
    return res.status(403).json({ 
      hasAccess: false, 
      message: 'No active subscription found' 
    });
  }

  let hasAccess = false;
  let message = '';

  switch (feature) {
    case 'createResume':
      const currentResumes = await Resume.countDocuments({ userId: req.user.id });
      hasAccess = subscription.type === 'pro' || currentResumes < subscription.features.maxResumes;
      message = hasAccess ? 'Access granted' : 'Resume limit reached. Please upgrade to Pro plan.';
      break;
    case 'premiumTemplates':
      hasAccess = subscription.features.premiumTemplates;
      message = hasAccess ? 'Access granted' : 'Premium templates are only available in Pro plan.';
      break;
    case 'removeWatermark':
      hasAccess = subscription.features.removeWatermark;
      message = hasAccess ? 'Access granted' : 'Watermark removal is only available in Pro plan.';
      break;
    default:
      message = 'Invalid feature requested';
  }

  res.status(200).json({ hasAccess, message });
});

// @desc    Cancel subscription
// @route   POST /api/subscriptions/cancel
// @access  Private
const cancelSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ userId: req.user.id });

  if (!subscription) {
    return res.status(404).json({ message: 'Subscription not found' });
  }

  subscription.status = 'cancelled';
  await subscription.save();

  res.status(200).json({ message: 'Subscription cancelled successfully' });
});

module.exports = {
  getSubscriptionStatus,
  upgradeSubscription,
  checkSubscriptionAccess,
  cancelSubscription
};
