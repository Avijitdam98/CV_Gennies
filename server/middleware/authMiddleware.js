const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded._id).select('-password');

      next();
    } catch (error) {
      console.error('Auth Error:', error);
      res.status(401).json({
        success: false,
        error: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Not authorized, no token'
    });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: 'Not authorized as an admin'
    });
  }
};

// Optional auth middleware - doesn't require authentication but attaches user if token present
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select('-password');
    } catch (error) {
      console.error('Optional Auth Error:', error);
      // Don't return error, just continue without user
    }
  }

  next();
};

// Rate limit middleware for specific user
const userRateLimit = (limit, windowMs) => {
  const requests = new Map();

  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user._id.toString();
    const now = Date.now();
    const userRequests = requests.get(userId) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < windowMs
    );

    if (validRequests.length >= limit) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded. Please try again later.'
      });
    }

    validRequests.push(now);
    requests.set(userId, validRequests);

    next();
  };
};

// Subscription check middleware
const requireSubscription = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  try {
    const user = await User.findById(req.user._id).populate('subscription');
    
    if (!user.subscription || user.subscription.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'Active subscription required'
      });
    }

    // Add subscription to request for feature checks
    req.subscription = user.subscription;
    next();
  } catch (error) {
    console.error('Subscription Check Error:', error);
    res.status(500).json({
      success: false,
      error: 'Error checking subscription status'
    });
  }
};

module.exports = {
  protect,
  admin,
  optionalAuth,
  userRateLimit,
  requireSubscription
};
