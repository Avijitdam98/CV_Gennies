const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  metrics: {
    totalUsers: Number,
    activeUsers: Number,
    proSubscribers: Number,
    totalResumes: Number,
    totalDownloads: Number,
    revenue: Number
  },
  userActivity: {
    newSignups: Number,
    loginCount: Number,
    resumeCreations: Number,
    templateUsage: Map,
    downloadCount: Number
  },
  subscriptionMetrics: {
    newSubscriptions: Number,
    renewals: Number,
    cancellations: Number,
    conversionRate: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Analytics', analyticsSchema);
