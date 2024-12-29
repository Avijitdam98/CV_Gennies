import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdvancedAnalytics = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  const fetchAnalytics = async () => {
    try {
      const [statsRes, conversionRes] = await Promise.all([
        axios.get(`/api/analytics/stats?period=${timeframe}`),
        axios.get('/api/analytics/conversions')
      ]);
      
      setData({
        stats: statsRes.data.data,
        conversions: conversionRes.data.data
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
        <div className="flex space-x-2">
          {['daily', 'weekly', 'monthly'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeframe === period
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ConversionCard
          title="Visitor to Signup"
          rate={data.conversions.visitorToSignup}
          icon="users"
        />
        <ConversionCard
          title="Signup to Subscription"
          rate={data.conversions.signupToSubscription}
          icon="credit-card"
        />
        <ConversionCard
          title="Overall Conversion"
          rate={data.conversions.overallConversion}
          icon="chart-bar"
        />
      </div>

      {/* Revenue and User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Timeline</h3>
          <Line
            data={{
              labels: data.stats.revenue.timeline.map(
                (item) => `${item._id.month}/${item._id.day}`
              ),
              datasets: [
                {
                  label: 'Revenue (₹)',
                  data: data.stats.revenue.timeline.map((item) => item.revenue),
                  borderColor: 'rgb(59, 130, 246)',
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `₹${value}`,
                  },
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <Bar
            data={{
              labels: ['Total Users', 'New Users', 'Active Users'],
              datasets: [
                {
                  label: 'Users',
                  data: [
                    data.stats.users.total,
                    data.stats.users.new,
                    data.stats.users.active,
                  ],
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(16, 185, 129, 0.5)',
                    'rgba(245, 158, 11, 0.5)',
                  ],
                  borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Template Usage and Subscription Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Template Usage</h3>
          <Doughnut
            data={{
              labels: data.stats.resumes.byTemplate.map((t) => t._id),
              datasets: [
                {
                  data: data.stats.resumes.byTemplate.map((t) => t.count),
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(16, 185, 129, 0.5)',
                    'rgba(245, 158, 11, 0.5)',
                    'rgba(236, 72, 153, 0.5)',
                    'rgba(139, 92, 246, 0.5)',
                  ],
                  borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(236, 72, 153)',
                    'rgb(139, 92, 246)',
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Subscription Distribution</h3>
          <Doughnut
            data={{
              labels: data.stats.subscriptions.byType.map((t) => t._id),
              datasets: [
                {
                  data: data.stats.subscriptions.byType.map((t) => t.count),
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(16, 185, 129, 0.5)',
                  ],
                  borderColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)'],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ConversionCard = ({ title, rate, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'chart-bar':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow"
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-full bg-primary-100 text-primary-600">
          {getIcon()}
        </div>
        <div className="text-2xl font-bold text-primary-600">
          {rate.toFixed(1)}%
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-1 relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-primary-100">
          <div
            style={{ width: `${rate}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedAnalytics;
