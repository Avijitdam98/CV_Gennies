const crypto = require('crypto');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const webhookHandler = asyncHandler(async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  // Verify webhook signature
  const shasum = crypto.createHmac('sha256', webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');
  
  if (digest === req.headers['x-razorpay-signature']) {
    const event = req.body;
    
    switch (event.event) {
      case 'payment.captured':
        // Payment successful, upgrade user's subscription
        const paymentData = event.payload.payment.entity;
        const userId = paymentData.notes.userId; // Assuming you're passing userId in notes
        
        // Calculate subscription end date (30 days from now)
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        
        // Update or create subscription
        await Subscription.findOneAndUpdate(
          { userId },
          {
            type: 'pro',
            paymentId: paymentData.id,
            startDate: new Date(),
            endDate: endDate,
            status: 'active',
            features: {
              maxResumes: -1,
              premiumTemplates: true,
              removeWatermark: true
            }
          },
          { upsert: true, new: true }
        );
        break;
        
      case 'payment.failed':
        // Handle failed payment
        console.log('Payment failed:', event.payload.payment.entity);
        break;
        
      case 'subscription.cancelled':
        // Handle subscription cancellation
        const subscriptionData = event.payload.subscription.entity;
        await Subscription.findOneAndUpdate(
          { paymentId: subscriptionData.payment_id },
          {
            status: 'cancelled',
            endDate: new Date()
          }
        );
        break;
    }
    
    res.status(200).json({ received: true });
  } else {
    res.status(400).json({ error: 'Invalid webhook signature' });
  }
});

module.exports = {
  webhookHandler
};
