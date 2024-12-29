const User = require('../models/User');
const Resume = require('../models/Resume');
const Subscription = require('../models/Subscription');
const Analytics = require('../models/Analytics');
const asyncHandler = require('express-async-handler');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Admin
const getDashboardAnalytics = asyncHandler(async (req, res) => {
  // Get current date metrics
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  // Aggregate metrics
  const [
    totalUsers,
    activeUsers,
    proSubscribers,
    totalResumes,
    dailySignups,
    dailyLogins,
    dailyResumes,
    revenue
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
    Subscription.countDocuments({ type: 'pro', status: 'active' }),
    Resume.countDocuments(),
    User.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } }),
    User.countDocuments({ lastLogin: { $gte: startOfDay, $lte: endOfDay } }),
    Resume.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } }),
    Subscription.aggregate([
      { $match: { type: 'pro', status: 'active' } },
      { $group: { _id: null, total: { $sum: 320 } } }
    ])
  ]);

  // Save analytics
  const analytics = await Analytics.create({
    metrics: {
      totalUsers,
      activeUsers,
      proSubscribers,
      totalResumes,
      revenue: revenue[0]?.total || 0
    },
    userActivity: {
      newSignups: dailySignups,
      loginCount: dailyLogins,
      resumeCreations: dailyResumes
    }
  });

  res.status(200).json({
    success: true,
    data: analytics
  });
});

// @desc    Get user management data
// @route   GET /api/admin/users
// @access  Admin
const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  const searchQuery = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }
    : {};

  const users = await User.find(searchQuery)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await User.countDocuments(searchQuery);

  const userIds = users.map(user => user._id);
  
  // Get subscription status for each user
  const subscriptions = await Subscription.find({
    userId: { $in: userIds }
  }).lean();

  // Get resume count for each user
  const resumeCounts = await Resume.aggregate([
    { $match: { userId: { $in: userIds } } },
    { $group: { _id: '$userId', count: { $sum: 1 } } }
  ]);

  // Combine user data with subscription and resume info
  const enrichedUsers = users.map(user => ({
    ...user,
    subscription: subscriptions.find(s => s.userId.toString() === user._id.toString()),
    resumeCount: resumeCounts.find(r => r._id.toString() === user._id.toString())?.count || 0
  }));

  res.status(200).json({
    success: true,
    data: enrichedUsers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Update user status
// @route   PUT /api/admin/users/:id
// @access  Admin
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, role } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (status) {
    user.status = status;
  }

  if (role) {
    user.role = role;
  }

  await user.save();

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get subscription analytics
// @route   GET /api/admin/subscriptions/analytics
// @access  Admin
const getSubscriptionAnalytics = asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const subscriptionStats = await Subscription.aggregate([
    {
      $facet: {
        monthly: [
          { $match: { createdAt: { $gte: thirtyDaysAgo } } },
          { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } }
        ],
        status: [
          { $group: { _id: '$status', count: { $sum: 1 } } }
        ],
        revenue: [
          { $match: { type: 'pro', status: 'active' } },
          { $group: { _id: null, total: { $sum: 320 } } }
        ]
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: subscriptionStats[0]
  });
});

module.exports = {
  getDashboardAnalytics,
  getUsers,
  updateUser,
  getSubscriptionAnalytics
};
