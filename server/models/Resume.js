const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  template: {
    type: String,
    required: true,
    default: 'modern'
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    website: String,
    summary: String,
    jobTitle: String,
    profileImage: String
  },
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    grade: String,
    description: String,
    location: String
  }],
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: String,
    highlights: [String],
    technologies: [String]
  }],
  skills: [{
    name: String,
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    category: String
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String,
    github: String,
    image: String,
    startDate: Date,
    endDate: Date,
    highlights: [String]
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    link: String,
    description: String
  }],
  languages: [{
    name: String,
    proficiency: {
      type: String,
      enum: ['Basic', 'Conversational', 'Fluent', 'Native']
    }
  }],
  awards: [{
    title: String,
    issuer: String,
    date: Date,
    description: String
  }],
  shareableLink: {
    type: String,
    unique: true,
    sparse: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  lastEdited: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastEdited timestamp on save
resumeSchema.pre('save', function(next) {
  this.lastEdited = new Date();
  next();
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
