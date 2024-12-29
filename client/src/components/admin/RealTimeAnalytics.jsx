import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

const RealTimeAnalytics = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentEvents, setRecentEvents] = useState([]);
  const socketRef = useRef();
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    // Connect to WebSocket
    socketRef.current = io(process.env.REACT_APP_API_URL);

    // Join admin room
    const token = localStorage.getItem('token');
    socketRef.current.emit('join_admin', token);

    // Listen for real-time updates
    socketRef.current.on('analytics_update', (data) => {
      setRecentEvents((prev) => [data, ...prev].slice(0, 50));
      updateRealTimeData(data);
    });

    // Listen for active users count
    socketRef.current.on('active_users_update', (count) => {
      setActiveUsers(count);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const updateRealTimeData = (newEvent) => {
    setRealTimeData((prev) => {
      const now = new Date();
      const timeLabel = now.toLocaleTimeString();
      
      // Group events by type
      const eventsByType = {};
      [...prev, { time: timeLabel, ...newEvent }].forEach((event) => {
        if (!eventsByType[event.type]) {
          eventsByType[event.type] = 0;
        }
        eventsByType[event.type]++;
      });

      return [...prev, { time: timeLabel, ...newEvent }].slice(-50);
    });
  };

  const exportToExcel = async () => {
    setExportLoading(true);
    try {
      // Prepare data for export
      const workbook = XLSX.utils.book_new();

      // Real-time events sheet
      const eventsData = recentEvents.map(event => ({
        Type: event.type,
        Timestamp: new Date(event.timestamp).toLocaleString(),
        Details: JSON.stringify(event.details)
      }));
      const eventsSheet = XLSX.utils.json_to_sheet(eventsData);
      XLSX.utils.book_append_sheet(workbook, eventsSheet, 'Real-time Events');

      // Active users sheet
      const usersData = [{ 'Active Users': activeUsers }];
      const usersSheet = XLSX.utils.json_to_sheet(usersData);
      XLSX.utils.book_append_sheet(workbook, usersSheet, 'Active Users');

      // Save the file
      XLSX.writeFile(workbook, `analytics_export_${new Date().toISOString()}.xlsx`);
    } catch (err) {
      console.error('Error exporting data:', err);
    }
    setExportLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Real-time Analytics</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportToExcel}
          disabled={exportLoading}
          className="px-4 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {exportLoading ? 'Exporting...' : 'Export Data'}
        </motion.button>
      </div>

      {/* Active Users Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
            <p className="text-sm text-gray-500">Currently online</p>
          </div>
          <div className="text-3xl font-bold text-primary-600">{activeUsers}</div>
        </div>
      </motion.div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Event Timeline</h3>
          <Line
            data={{
              labels: realTimeData.map(d => d.time),
              datasets: [
                {
                  label: 'Events',
                  data: realTimeData.map(d => 1),
                  borderColor: 'rgb(59, 130, 246)',
                  tension: 0.4,
                  fill: false
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1
                  }
                }
              }
            }}
          />
        </div>

        {/* Event Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Event Distribution</h3>
          <Bar
            data={{
              labels: [...new Set(realTimeData.map(d => d.type))],
              datasets: [
                {
                  label: 'Event Count',
                  data: Object.values(
                    realTimeData.reduce((acc, curr) => {
                      acc[curr.type] = (acc[curr.type] || 0) + 1;
                      return acc;
                    }, {})
                  ),
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                  borderColor: 'rgb(59, 130, 246)',
                  borderWidth: 1
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Recent Events List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Events</h3>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentEvents.map((event, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {JSON.stringify(event.details)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalytics;
