import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';

const AnalyticsExport = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [exportType, setExportType] = useState('all');

  const exportTypes = [
    { id: 'all', label: 'All Analytics' },
    { id: 'users', label: 'User Analytics' },
    { id: 'resumes', label: 'Resume Analytics' },
    { id: 'subscriptions', label: 'Subscription Analytics' },
    { id: 'revenue', label: 'Revenue Analytics' }
  ];

  const fetchAndExportData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/analytics/export', {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          type: exportType
        }
      });

      const workbook = XLSX.utils.book_new();

      // Process different types of analytics data
      if (exportType === 'all' || exportType === 'users') {
        const userSheet = XLSX.utils.json_to_sheet(data.users);
        XLSX.utils.book_append_sheet(workbook, userSheet, 'Users');
      }

      if (exportType === 'all' || exportType === 'resumes') {
        const resumeSheet = XLSX.utils.json_to_sheet(data.resumes);
        XLSX.utils.book_append_sheet(workbook, resumeSheet, 'Resumes');
      }

      if (exportType === 'all' || exportType === 'subscriptions') {
        const subscriptionSheet = XLSX.utils.json_to_sheet(data.subscriptions);
        XLSX.utils.book_append_sheet(workbook, subscriptionSheet, 'Subscriptions');
      }

      if (exportType === 'all' || exportType === 'revenue') {
        const revenueSheet = XLSX.utils.json_to_sheet(data.revenue);
        XLSX.utils.book_append_sheet(workbook, revenueSheet, 'Revenue');
      }

      // Generate filename with date range
      const filename = `cvgennie_analytics_${dateRange.startDate}_to_${dateRange.endDate}.xlsx`;
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Export Analytics</h2>

      {/* Date Range Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Export Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Export Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exportTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExportType(type.id)}
              className={`p-4 rounded-lg border ${
                exportType === type.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-primary-200'
              }`}
            >
              {type.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={fetchAndExportData}
        disabled={loading || !dateRange.startDate || !dateRange.endDate}
        className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Exporting...
          </div>
        ) : (
          'Export Data'
        )}
      </motion.button>

      {/* Export Instructions */}
      <div className="mt-6 bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Export Instructions
        </h3>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>Select a date range to export data for specific time periods</li>
          <li>Choose an export type to filter the data you want to export</li>
          <li>
            'All Analytics' will export everything in separate sheets within the
            same file
          </li>
          <li>
            The exported file will be in Excel format (.xlsx) and will download
            automatically
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsExport;
