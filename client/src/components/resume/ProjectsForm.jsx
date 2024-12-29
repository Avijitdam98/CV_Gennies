import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsForm = ({ data = [], onChange }) => {
  const [projectsList, setProjectsList] = useState(data);

  useEffect(() => {
    onChange(projectsList);
  }, [projectsList, onChange]);

  const addProject = () => {
    setProjectsList([
      ...projectsList,
      {
        id: Date.now(),
        title: '',
        description: '',
        technologies: [],
        link: '',
      },
    ]);
  };

  const removeProject = (id) => {
    setProjectsList(projectsList.filter((project) => project.id !== id));
  };

  const handleChange = (id, field, value) => {
    setProjectsList(
      projectsList.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const handleTechnologiesChange = (id, value) => {
    const technologies = value
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech !== '');

    handleChange(id, 'technologies', technologies);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {projectsList.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                Project Details
              </h3>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    handleChange(project.id, 'title', e.target.value)
                  }
                  className="input mt-1"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    handleChange(project.id, 'description', e.target.value)
                  }
                  rows={3}
                  className="input mt-1"
                  placeholder="Describe the project, its goals, and your role..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Technologies Used
                </label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) =>
                    handleTechnologiesChange(project.id, e.target.value)
                  }
                  className="input mt-1"
                  placeholder="React, Node.js, MongoDB, etc. (comma-separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Link
                </label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) =>
                    handleChange(project.id, 'link', e.target.value)
                  }
                  className="input mt-1"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={addProject}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Add Project
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Tips for showcasing projects:</h4>
        <ul className="text-sm text-blue-700 list-disc list-inside">
          <li>Focus on projects that demonstrate relevant skills</li>
          <li>Include measurable outcomes and impact</li>
          <li>Highlight your specific contributions in team projects</li>
          <li>Add links to live demos or repositories when possible</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;
