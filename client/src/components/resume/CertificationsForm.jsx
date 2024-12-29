import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CertificationsForm = ({ data = [], onChange }) => {
  const [certificationsList, setCertificationsList] = useState(data);

  // Sync with parent data changes
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(certificationsList)) {
      setCertificationsList(data);
    }
  }, [data]);

  // Notify parent of changes
  useEffect(() => {
    onChange(certificationsList);
  }, [certificationsList, onChange]);

  const addCertification = () => {
    const newList = [
      ...certificationsList,
      {
        id: Date.now(),
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
      },
    ];
    setCertificationsList(newList);
  };

  const removeCertification = (id) => {
    const newList = certificationsList.filter((cert) => cert.id !== id);
    setCertificationsList(newList);
  };

  const handleChange = (id, field, value) => {
    const newList = certificationsList.map((cert) =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    setCertificationsList(newList);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {certificationsList.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-4 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                Certification Details
              </h3>
              <button
                onClick={() => removeCertification(cert.id)}
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
                  Certification Name
                </label>
                <input
                  type="text"
                  value={cert.name || ''}
                  onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g., Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issue Date
                </label>
                <input
                  type="month"
                  value={cert.issueDate || ''}
                  onChange={(e) => handleChange(cert.id, 'issueDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="month"
                  value={cert.expiryDate || ''}
                  onChange={(e) => handleChange(cert.id, 'expiryDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={cert.credentialId || ''}
                  onChange={(e) => handleChange(cert.id, 'credentialId', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g., ABC123XYZ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Credential URL
                </label>
                <input
                  type="url"
                  value={cert.credentialUrl || ''}
                  onChange={(e) => handleChange(cert.id, 'credentialUrl', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={addCertification}
        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;
