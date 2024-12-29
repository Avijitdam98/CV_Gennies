import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsForm = ({ data = [], onChange }) => {
  const [skillsList, setSkillsList] = useState(
    data.map(skill => ({
      ...skill,
      id: skill.id || Date.now() + Math.random()
    })) || []
  );

  useEffect(() => {
    onChange(skillsList.map(({ id, ...skill }) => skill));
  }, [skillsList, onChange]);

  const addSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        id: Date.now() + Math.random(),
        name: '',
        proficiency: 'Intermediate'
      },
    ]);
  };

  const removeSkill = (id) => {
    setSkillsList(skillsList.filter((skill) => skill.id !== id));
  };

  const handleChange = (id, field, value) => {
    setSkillsList(
      skillsList.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <button
          type="button"
          onClick={addSkill}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Skill
        </button>
      </div>

      <AnimatePresence>
        {skillsList.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No skills added yet. Click "Add New Skill" to get started.
          </div>
        ) : (
          skillsList.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white shadow rounded-lg p-4 mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={skill.name || ''}
                    onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
                    placeholder="e.g., JavaScript, Project Management"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={skill.proficiency || 'Intermediate'}
                    onChange={(e) => handleChange(skill.id, 'proficiency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    {proficiencyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {skillsList.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          <p>Tips:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Add your most relevant skills first</li>
            <li>Be specific with skill names (e.g., "React.js" instead of just "JavaScript")</li>
            <li>Choose proficiency levels honestly</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
