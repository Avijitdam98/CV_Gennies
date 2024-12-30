const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Resume = require('../models/Resume');

// Debug route - Get all resumes (for debugging only)
router.get('/debug/all', protect, async (req, res) => {
  try {
    const resumes = await Resume.find({});
    res.json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (err) {
    console.error('Error in debug route:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all resumes for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    console.log('Fetching resumes for user:', req.user.id);
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
    console.log('Found resumes:', resumes.length);
    res.json({
      success: true,
      data: resumes
    });
  } catch (err) {
    console.error('Error fetching resumes:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Get a specific resume
router.get('/:id', protect, async (req, res) => {
  try {
    console.log('Fetching resume with ID:', req.params.id, 'for user:', req.user.id);
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!resume) {
      console.log('Resume not found');
      return res.status(404).json({ 
        success: false,
        message: 'Resume not found',
        details: 'The requested resume does not exist or you do not have permission to view it'
      });
    }

    console.log('Resume found:', resume._id);
    res.json({
      success: true,
      data: resume
    });
  } catch (err) {
    console.error('Error fetching resume:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Invalid resume ID format',
        details: err.message
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      details: err.message
    });
  }
});

// Create a new resume
router.post('/', protect, async (req, res) => {
  try {
    // Check user's subscription and resume count for free tier
    if (req.user.subscription.type === 'free') {
      const resumeCount = await Resume.countDocuments({ user: req.user.id });
      if (resumeCount >= 1) {
        return res.status(403).json({
          success: false,
          message: 'Free tier users can only create one resume. Please upgrade to create more.',
          code: 'UPGRADE_REQUIRED'
        });
      }
    }

    const resume = await Resume.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (err) {
    console.error('Error creating resume:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating resume'
    });
  }
});

// Update a resume
router.put('/:id', protect, async (req, res) => {
  try {
    let resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ 
        success: false,
        message: 'Resume not found' 
      });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { 
        $set: {
          template: req.body.template,
          personalInfo: req.body.personalInfo,
          education: req.body.education,
          experience: req.body.experience,
          skills: req.body.skills,
          projects: req.body.projects,
          certifications: req.body.certifications,
          languages: req.body.languages,
          awards: req.body.awards
        }
      },
      { new: true }
    );

    res.json({
      success: true,
      data: resume
    });
  } catch (err) {
    console.error('Error updating resume:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Resume not found' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Delete a resume
router.delete('/:id', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ 
        success: false,
        message: 'Resume not found' 
      });
    }

    await Resume.findByIdAndRemove(req.params.id);
    res.json({ 
      success: true,
      data: { _id: req.params.id }
    });
  } catch (err) {
    console.error('Error deleting resume:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Resume not found' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router;
