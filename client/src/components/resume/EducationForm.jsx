import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EducationForm = ({ data = [], onChange }) => {
  const [educationList, setEducationList] = useState(data);

  // Sync with parent data changes
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(educationList)) {
      setEducationList(data);
    }
  }, [data]);

  const addEducation = () => {
    const newList = [
      ...educationList,
      {
        id: Date.now(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        grade: '',
        description: '',
      },
    ];
    setEducationList(newList);
    onChange(newList);
  };

  const removeEducation = (id) => {
    const newList = educationList.filter((edu) => edu.id !== id);
    setEducationList(newList);
    onChange(newList);
  };

  const handleChange = (id, field, value) => {
    const newList = educationList.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducationList(newList);
    onChange(newList);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {educationList.map((education) => (
          <motion.div
            key={education.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                Education Entry
              </h3>
              <button
                onClick={() => removeEducation(education.id)}
                className="text-red-600 hover:text-red-800 transition-colors duration-150"
                aria-label="Remove education entry"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) =>
                    handleChange(education.id, 'institution', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="University/School Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) =>
                    handleChange(education.id, 'degree', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={education.field}
                  onChange={(e) =>
                    handleChange(education.id, 'field', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Computer Science, Business, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Grade/GPA
                </label>
                <input
                  type="text"
                  value={education.grade}
                  onChange={(e) =>
                    handleChange(education.id, 'grade', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="3.8/4.0, First Class, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="month"
                  value={education.startDate}
                  onChange={(e) =>
                    handleChange(education.id, 'startDate', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="month"
                  value={education.endDate}
                  onChange={(e) =>
                    handleChange(education.id, 'endDate', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={education.description}
                onChange={(e) =>
                  handleChange(education.id, 'description', e.target.value)
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Notable achievements, activities, or coursework..."
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={addEducation}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150"
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;
