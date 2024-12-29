const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order for subscription
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment order'
    });
  }
});

// Verify payment and update subscription
router.post('/verify', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Update user subscription
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    await User.findByIdAndUpdate(req.user.id, {
      'subscription.type': 'pro',
      'subscription.validUntil': oneMonthFromNow
    });

    res.json({
      success: true,
      message: 'Payment verified and subscription updated'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment'
    });
  }
});

// Get subscription status
router.get('/subscription-status', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      subscription: user.subscription
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscription status'
    });
  }
});

module.exports = router;
