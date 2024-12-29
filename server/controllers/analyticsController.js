const Analytics = require('../models/Analytics');
const User = require('../models/User');
const Resume = require('../models/Resume');
const Subscription = require('../models/Subscription');
const asyncHandler = require('express-async-handler');

// @desc    Record user activity
// @route   POST /api/analytics/activity
// @access  Private
const recordActivity = asyncHandler(async (req, res) => {
  const { type, details } = req.body;
  const userId = req.user._id;

  await Analytics.create({
    userId,
    activityType: type,
    details
  });

  res.status(200).json({
    success: true,
    message: 'Activity recorded successfully'
  });
});

// @desc    Get user activity history
// @route   GET /api/analytics/activity/:userId
// @access  Admin
const getUserActivity = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const activities = await Analytics.find({ userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Analytics.countDocuments({ userId });

  res.status(200).json({
    success: true,
    data: activities,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get platform statistics
// @route   GET /api/analytics/stats
// @access  Admin
const getPlatformStats = asyncHandler(async (req, res) => {
  const { period } = req.query; // daily, weekly, monthly
  const now = new Date();
  let startDate;

  switch (period) {
    case 'weekly':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'monthly':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    default: // daily
      startDate = new Date(now.setHours(0, 0, 0, 0));
  }

  const [
    userStats,
    resumeStats,
    subscriptionStats,
    revenueStats
  ] = await Promise.all([
    // User statistics
    User.aggregate([
      {
        $facet: {
          total: [{ $count: 'count' }],
          new: [
            { $match: { createdAt: { $gte: startDate } } },
            { $count: 'count' }
          ],
          active: [
            { $match: { lastActive: { $gte: startDate } } },
            { $count: 'count' }
          ]
        }
      }
    ]),

    // Resume statistics
    Resume.aggregate([
      {
        $facet: {
          total: [{ $count: 'count' }],
          new: [
            { $match: { createdAt: { $gte: startDate } } },
            { $count: 'count' }
          ],
          byTemplate: [
            { $group: { _id: '$template', count: { $sum: 1 } } }
          ]
        }
      }
    ]),

    // Subscription statistics
    Subscription.aggregate([
      {
        $facet: {
          active: [
            { $match: { status: 'active' } },
            { $count: 'count' }
          ],
          new: [
            { $match: { createdAt: { $gte: startDate } } },
            { $count: 'count' }
          ],
          byType: [
            { $group: { _id: '$type', count: { $sum: 1 } } }
          ]
        }
      }
    ]),

    // Revenue statistics
    Subscription.aggregate([
      {
        $match: {
          status: 'active',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          revenue: { $sum: 320 } // Assuming ₹320 per subscription
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ])
  ]);

  res.status(200).json({
    success: true,
    data: {
      users: {
        total: userStats[0].total[0]?.count || 0,
        new: userStats[0].new[0]?.count || 0,
        active: userStats[0].active[0]?.count || 0
      },
      resumes: {
        total: resumeStats[0].total[0]?.count || 0,
        new: resumeStats[0].new[0]?.count || 0,
        byTemplate: resumeStats[0].byTemplate
      },
      subscriptions: {
        active: subscriptionStats[0].active[0]?.count || 0,
        new: subscriptionStats[0].new[0]?.count || 0,
        byType: subscriptionStats[0].byType
      },
      revenue: {
        timeline: revenueStats
      }
    }
  });
});

// @desc    Get conversion metrics
// @route   GET /api/analytics/conversions
// @access  Admin
const getConversionMetrics = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const dateFilter = {};

  if (startDate) {
    dateFilter.createdAt = { $gte: new Date(startDate) };
  }
  if (endDate) {
    dateFilter.createdAt = { ...dateFilter.createdAt, $lte: new Date(endDate) };
  }

  const [totalVisitors, signups, subscriptions] = await Promise.all([
    Analytics.countDocuments({ activityType: 'visit', ...dateFilter }),
    User.countDocuments(dateFilter),
    Subscription.countDocuments({ status: 'active', ...dateFilter })
  ]);

  const metrics = {
    visitorToSignup: totalVisitors ? (signups / totalVisitors) * 100 : 0,
    signupToSubscription: signups ? (subscriptions / signups) * 100 : 0,
    overallConversion: totalVisitors ? (subscriptions / totalVisitors) * 100 : 0
  };

  res.status(200).json({
    success: true,
    data: metrics
  });
});

module.exports = {
  recordActivity,
  getUserActivity,
  getPlatformStats,
  getConversionMetrics
};
