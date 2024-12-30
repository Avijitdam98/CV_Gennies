const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['free', 'pro'],
    default: 'free'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  paymentId: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  features: {
    maxResumes: {
      type: Number,
      default: 1 // Free plan limit - updated to 1
    },
    premiumTemplates: {
      type: Boolean,
      default: false
    },
    removeWatermark: {
      type: Boolean,
      default: false
    },
    analytics: {
      type: Boolean,
      default: false
    },
    prioritySupport: {
      type: Boolean,
      default: false
    },
    customDomain: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Add index for faster lookups
subscriptionSchema.index({ userId: 1 });

// Method to check if subscription is active
subscriptionSchema.methods.isActive = function() {
  return this.status === 'active' && (!this.endDate || new Date(this.endDate) > new Date());
};

// Method to check if user can create more resumes
subscriptionSchema.methods.canCreateResume = function() {
  return this.type === 'pro' || this.features.maxResumes > 0;
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
