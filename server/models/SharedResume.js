const mongoose = require('mongoose');
const crypto = require('crypto');

const sharedResumeSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shareToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(32).toString('hex')
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  views: {
    type: Number,
    default: 0
  },
  lastViewed: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster lookups
sharedResumeSchema.index({ userId: 1, resumeId: 1 });

module.exports = mongoose.model('SharedResume', sharedResumeSchema);
