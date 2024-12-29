import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceForm = ({ data = [], onChange }) => {
  const [experienceList, setExperienceList] = useState(data);

  // Sync with parent data changes
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(experienceList)) {
      setExperienceList(data);
    }
  }, [data]);

  const addExperience = () => {
    const newList = [
      ...experienceList,
      {
        id: Date.now(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ];
    setExperienceList(newList);
    onChange(newList);
  };

  const removeExperience = (id) => {
    const newList = experienceList.filter((exp) => exp.id !== id);
    setExperienceList(newList);
    onChange(newList);
  };

  const handleChange = (id, field, value) => {
    console.log('Handling change:', id, field, value); // Debug log
    const newList = experienceList.map((exp) =>
      exp.id === id
        ? {
            ...exp,
            [field]: value,
            ...(field === 'current' && value ? { endDate: '' } : {}),
          }
        : exp
    );
    setExperienceList(newList);
    onChange(newList);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {experienceList.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                Experience Entry
              </h3>
              <button
                onClick={() => removeExperience(experience.id)}
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
                  Company
                </label>
                <input
                  type="text"
                  value={experience.company || ''}
                  onChange={(e) =>
                    handleChange(experience.id, 'company', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  value={experience.position || ''}
                  onChange={(e) =>
                    handleChange(experience.id, 'position', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={experience.location || ''}
                  onChange={(e) =>
                    handleChange(experience.id, 'location', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="month"
                  value={experience.startDate || ''}
                  onChange={(e) =>
                    handleChange(experience.id, 'startDate', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <input
                    type="month"
                    value={experience.endDate || ''}
                    onChange={(e) =>
                      handleChange(experience.id, 'endDate', e.target.value)
                    }
                    disabled={experience.current}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={experience.current || false}
                      onChange={(e) =>
                        handleChange(experience.id, 'current', e.target.checked)
                      }
                      className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Current</span>
                  </label>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={experience.description || ''}
                  onChange={(e) =>
                    handleChange(experience.id, 'description', e.target.value)
                  }
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={addExperience}
        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
