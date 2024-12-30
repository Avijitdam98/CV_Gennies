const Resume = require('../models/Resume');
const Subscription = require('../models/Subscription');

const checkResumeLimit = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const userId = req.user.id; // Using req.user.id instead of _id
    
    // Get user's subscription
    const subscription = await Subscription.findOne({ userId });
    const isFreeTier = !subscription || subscription.type === 'free';
    
    if (isFreeTier) {
      // Count user's existing resumes
      const resumeCount = await Resume.countDocuments({ user: userId });
      
      if (resumeCount >= 1) {
        return res.status(403).json({
          success: false,
          message: 'Free tier limit reached',
          code: 'UPGRADE_REQUIRED',
          data: {
            currentCount: resumeCount,
            limit: 1,
            subscription: subscription?.type || 'free'
          }
        });
      }
    }
    
    next();
  } catch (error) {
    console.error('Error in checkResumeLimit middleware:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while checking resume limit'
    });
  }
};

module.exports = { checkResumeLimit };
