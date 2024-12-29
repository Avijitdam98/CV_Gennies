import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FileText, Plus, Edit2, Trash2, Loader2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useSelector((state) => state.auth);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        throw new Error('Not authenticated');
      }

      console.log('Fetching resumes with token:', token);
      const response = await fetch('http://localhost:5000/api/resumes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch resumes');
      }

      const data = await response.json();
      console.log('Fetched resumes:', data);
      
      if (data.success) {
        setResumes(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch resumes');
      }
    } catch (err) {
      console.error('Error fetching resumes:', err);
      setError(err.message);
      if (err.message === 'Not authenticated') {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchResumes();
    } else {
      navigate('/login');
    }
  }, [token, lastUpdate]);

  useEffect(() => {
    const handleFocus = () => {
      console.log('Window focused, refreshing resumes');
      setLastUpdate(Date.now());
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleCreateNew = () => {
    navigate('/create-resume');
  };

  const handleEditResume = (id) => {
    navigate(`/edit-resume/${id}`);
  };

  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    setLastUpdate(Date.now());
  };

  const handleDeleteResume = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/resumes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }

      const data = await response.json();
      if (data.success) {
        setResumes((prevResumes) => prevResumes.filter((resume) => resume._id !== id));
        toast.success('Resume deleted successfully');
      } else {
        throw new Error(data.message || 'Failed to delete resume');
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
      toast.error(err.message || 'Failed to delete resume');
    }
  };

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Resumes
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLastUpdate(Date.now())}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => navigate('/create-resume')}
              className="inline-flex items-center px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Resumes Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {resume.personalInfo?.fullName || 'Untitled Resume'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/edit-resume/${resume._id}`)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteResume(resume._id)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {resumes.length === 0 && !loading && (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
                <p className="text-gray-500 mb-6">Create your first resume to get started</p>
                <button
                  onClick={() => navigate('/create-resume')}
                  className="inline-flex items-center px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Resume
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResumes;
