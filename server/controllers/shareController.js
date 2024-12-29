const SharedResume = require('../models/SharedResume');
const Resume = require('../models/Resume');
const asyncHandler = require('express-async-handler');

// @desc    Create a shareable link for a resume
// @route   POST /api/share/resume/:resumeId
// @access  Private
const createShareableLink = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const userId = req.user._id;

  // Check if resume exists and belongs to user
  const resume = await Resume.findOne({ _id: resumeId, userId });
  if (!resume) {
    res.status(404);
    throw new Error('Resume not found');
  }

  // Check if a share link already exists
  let sharedResume = await SharedResume.findOne({ resumeId, userId });

  if (!sharedResume) {
    // Create new share link
    sharedResume = await SharedResume.create({
      resumeId,
      userId,
    });
  } else if (!sharedResume.isActive) {
    // Reactivate existing share link
    sharedResume.isActive = true;
    sharedResume.expiresAt = new Date(+new Date() + 30 * 24 * 60 * 60 * 1000);
    await sharedResume.save();
  }

  res.status(200).json({
    success: true,
    data: {
      shareToken: sharedResume.shareToken,
      expiresAt: sharedResume.expiresAt,
      shareUrl: `${process.env.CLIENT_URL}/r/${sharedResume.shareToken}`
    }
  });
});

// @desc    Get shared resume by token
// @route   GET /api/share/:token
// @access  Public
const getSharedResume = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const sharedResume = await SharedResume.findOne({
    shareToken: token,
    isActive: true,
    expiresAt: { $gt: new Date() }
  });

  if (!sharedResume) {
    res.status(404);
    throw new Error('Invalid or expired share link');
  }

  // Increment views and update last viewed
  sharedResume.views += 1;
  sharedResume.lastViewed = new Date();
  await sharedResume.save();

  // Get resume data
  const resume = await Resume.findById(sharedResume.resumeId)
    .select('-__v')
    .populate('userId', 'name');

  if (!resume) {
    res.status(404);
    throw new Error('Resume not found');
  }

  res.status(200).json({
    success: true,
    data: resume
  });
});

// @desc    Deactivate shared resume link
// @route   DELETE /api/share/resume/:resumeId
// @access  Private
const deactivateShareableLink = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const userId = req.user._id;

  const sharedResume = await SharedResume.findOne({ resumeId, userId });

  if (!sharedResume) {
    res.status(404);
    throw new Error('Share link not found');
  }

  sharedResume.isActive = false;
  await sharedResume.save();

  res.status(200).json({
    success: true,
    message: 'Share link deactivated successfully'
  });
});

// @desc    Get share statistics for a resume
// @route   GET /api/share/stats/:resumeId
// @access  Private
const getShareStats = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const userId = req.user._id;

  const sharedResume = await SharedResume.findOne({ resumeId, userId });

  if (!sharedResume) {
    res.status(404);
    throw new Error('Share link not found');
  }

  res.status(200).json({
    success: true,
    data: {
      views: sharedResume.views,
      lastViewed: sharedResume.lastViewed,
      isActive: sharedResume.isActive,
      expiresAt: sharedResume.expiresAt,
      shareUrl: `${process.env.CLIENT_URL}/r/${sharedResume.shareToken}`
    }
  });
});

module.exports = {
  createShareableLink,
  getSharedResume,
  deactivateShareableLink,
  getShareStats
};
