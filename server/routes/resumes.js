const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');
const { checkResumeLimit } = require('../middleware/subscriptionMiddleware');

// Get all resumes for current user
router.get('/', protect, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const resumes = await Resume.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (err) {
    console.error('Error fetching resumes:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching resumes',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Create new resume
router.post('/', protect, checkResumeLimit, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const resumeData = {
      user: req.user.id,
      template: req.body.template || 'modern',
      personalInfo: req.body.personalInfo || {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        summary: ''
      },
      education: req.body.education || [],
      experience: req.body.experience || [],
      skills: req.body.skills || [],
      projects: req.body.projects || [],
      certifications: req.body.certifications || [],
      languages: req.body.languages || [],
      awards: req.body.awards || []
    };

    const resume = await Resume.create(resumeData);

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (err) {
    console.error('Error creating resume:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating resume',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get single resume by ID
router.get('/:id', protect, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Make sure user owns resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      data: resume
    });
  } catch (err) {
    console.error('Error fetching resume:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching resume',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Update resume
router.put('/:id', protect, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Check ownership
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this resume'
      });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        user: req.user.id // Ensure user ID doesn't change
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      data: updatedResume
    });
  } catch (err) {
    console.error('Error updating resume:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating resume',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Delete resume
router.delete('/:id', protect, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Make sure user owns resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (err) {
    console.error('Delete resume error:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting resume',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get resume by shareable link
router.get('/share/:link', async (req, res) => {
  try {
    const resume = await Resume.findOne({
      shareableLink: req.params.link,
      isPublic: true
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found or not public'
      });
    }

    res.json({
      success: true,
      data: resume
    });
  } catch (err) {
    console.error('Error fetching resume:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching resume',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;
