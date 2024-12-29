import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguagesForm = ({ data = [], onChange }) => {
  const [languagesList, setLanguagesList] = useState(data);

  // Sync with parent data changes
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(languagesList)) {
      setLanguagesList(data);
    }
  }, [data]);

  // Notify parent of changes
  useEffect(() => {
    onChange(languagesList);
  }, [languagesList, onChange]);

  const addLanguage = () => {
    const newList = [
      ...languagesList,
      {
        id: Date.now(),
        name: '',
        proficiency: 'Intermediate',
      },
    ];
    setLanguagesList(newList);
  };

  const removeLanguage = (id) => {
    const newList = languagesList.filter((lang) => lang.id !== id);
    setLanguagesList(newList);
  };

  const handleChange = (id, field, value) => {
    const newList = languagesList.map((lang) =>
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    setLanguagesList(newList);
  };

  const proficiencyLevels = [
    'Native',
    'Fluent',
    'Advanced',
    'Intermediate',
    'Basic',
  ];

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {languagesList.map((lang) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <input
                  type="text"
                  value={lang.name || ''}
                  onChange={(e) => handleChange(lang.id, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Language name (e.g., English, Spanish)"
                />
              </div>

              <div className="w-40">
                <select
                  value={lang.proficiency || 'Intermediate'}
                  onChange={(e) =>
                    handleChange(lang.id, 'proficiency', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  {proficiencyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => removeLanguage(lang.id)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={addLanguage}
        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Language
      </button>
    </div>
  );
};

export default LanguagesForm;
