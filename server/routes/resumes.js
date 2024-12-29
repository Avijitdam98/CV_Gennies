const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

// Get all resumes for current user
router.get('/', protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json({
      success: true,
      data: resumes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Create new resume
router.post('/', protect, async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Update resume
router.put('/:id', protect, async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

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

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: resume
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Delete resume
router.delete('/:id', protect, async (req, res) => {
  try {
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

    await resume.remove();

    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
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
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

module.exports = router;
