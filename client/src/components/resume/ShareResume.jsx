import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ShareResume = ({ resumeId, subscription }) => {
  const [shareData, setShareData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState(null);

  const isPro = subscription?.type === 'pro';

  useEffect(() => {
    if (isPro && resumeId) {
      fetchShareStats();
    }
  }, [resumeId]);

  const fetchShareStats = async () => {
    try {
      const { data } = await axios.get(`/api/share/stats/${resumeId}`);
      setShareData(data.data);
      setStats(data.data);
    } catch (err) {
      console.error('Error fetching share stats:', err);
    }
  };

  const createShareableLink = async () => {
    if (!isPro) {
      setError('Upgrade to Pro to share your resume');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(`/api/share/resume/${resumeId}`);
      setShareData(data.data);
      await fetchShareStats();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create shareable link');
    } finally {
      setLoading(false);
    }
  };

  const deactivateLink = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/share/resume/${resumeId}`);
      setShareData(null);
      await fetchShareStats();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to deactivate link');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Resume</h2>

      {!isPro && (
        <div className="mb-4 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-primary-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-primary-800">
                Pro Feature
              </h3>
              <div className="mt-2 text-sm text-primary-700">
                <p>
                  Upgrade to Pro to share your resume with a custom link and track views.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {stats && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Total Views</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {stats.views}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Last Viewed</div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {stats.lastViewed
                ? new Date(stats.lastViewed).toLocaleDateString()
                : 'Never'}
            </div>
          </div>
        </div>
      )}

      {!shareData && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={createShareableLink}
          disabled={loading || !isPro}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
            isPro
              ? 'bg-primary-600 hover:bg-primary-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Create Shareable Link'
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {shareData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="text"
                value={shareData.shareUrl}
                readOnly
                className="block w-full pr-24 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-md hover:bg-primary-200"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Expires: {new Date(shareData.expiresAt).toLocaleDateString()}</span>
              <button
                onClick={deactivateLink}
                className="text-red-600 hover:text-red-800"
              >
                Deactivate Link
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareResume;
