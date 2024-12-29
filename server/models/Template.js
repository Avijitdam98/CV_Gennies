const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  previewImage: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  css: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['Professional', 'Creative', 'Simple', 'Modern', 'Academic'],
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
