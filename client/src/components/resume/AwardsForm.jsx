import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AwardsForm = ({ data = [], onChange }) => {
  const [awardsList, setAwardsList] = useState(data);

  // Sync with parent data changes
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(awardsList)) {
      setAwardsList(data);
    }
  }, [data]);

  // Notify parent of changes
  useEffect(() => {
    onChange(awardsList);
  }, [awardsList, onChange]);

  const addAward = () => {
    const newList = [
      ...awardsList,
      {
        id: Date.now(),
        title: '',
        issuer: '',
        date: '',
        description: '',
      },
    ];
    setAwardsList(newList);
  };

  const removeAward = (id) => {
    const newList = awardsList.filter((award) => award.id !== id);
    setAwardsList(newList);
  };

  const handleChange = (id, field, value) => {
    const newList = awardsList.map((award) =>
      award.id === id ? { ...award, [field]: value } : award
    );
    setAwardsList(newList);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {awardsList.map((award) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">Award Details</h3>
              <button
                onClick={() => removeAward(award.id)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Award Title
                </label>
                <input
                  type="text"
                  value={award.title || ''}
                  onChange={(e) => handleChange(award.id, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g., Employee of the Year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={award.issuer || ''}
                  onChange={(e) => handleChange(award.id, 'issuer', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g., Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date Received
                </label>
                <input
                  type="month"
                  value={award.date || ''}
                  onChange={(e) => handleChange(award.id, 'date', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={award.description || ''}
                onChange={(e) => handleChange(award.id, 'description', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Describe the award and its significance..."
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={addAward}
        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Award
      </button>
    </div>
  );
};

export default AwardsForm;
