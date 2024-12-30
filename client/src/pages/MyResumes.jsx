import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FileText, Plus, Edit2, Trash2, Loader2, RefreshCw, Crown } from 'lucide-react';
import toast from 'react-hot-toast';

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
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
      setLastUpdate(Date.now());
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleCreateNew = () => {
    if (user?.subscription?.type === 'free' && resumes.length >= 1) {
      setShowUpgradeModal(true);
      return;
    }
    navigate('/create-resume');
  };

  const handleEditResume = (id) => {
    navigate(`/edit-resume/${id}`);
  };

  const handleRefresh = () => {
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

      toast.success('Resume deleted successfully');
      setLastUpdate(Date.now());
    } catch (err) {
      console.error('Error deleting resume:', err);
      toast.error('Failed to delete resume');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <div className="flex gap-4">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white rounded-lg border hover:bg-gray-50"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Create New Resume
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 p-4">{error}</div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No resumes yet</h3>
          <p className="text-gray-600 mb-6">Create your first resume to get started</p>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Create New Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <FileText className="w-10 h-10 text-blue-600 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">
                    {resume.personalInfo?.name || 'Untitled Resume'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                {user?.subscription?.type === 'free' && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    Free
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEditResume(resume._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded hover:bg-blue-100"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteResume(resume._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-center mb-6">
              <Crown className="w-16 h-16 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Upgrade to Pro</h2>
            <p className="text-gray-600 text-center mb-6">
              Free users can create only one resume. Upgrade to Pro to create unlimited resumes and access premium features!
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/subscription')}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upgrade Now
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResumes;
