import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Manage your resumes and subscription here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Resume Card */}
          <div className="bg-primary-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-primary-900 mb-2">Create New Resume</h2>
            <p className="text-primary-600 mb-4">Start building your professional resume with our easy-to-use builder.</p>
            <button
              onClick={() => navigate('/create-resume')}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </div>

          {/* My Resumes Card */}
          <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">My Resumes</h2>
            <p className="text-gray-600 mb-4">View and edit your existing resumes.</p>
            <button
              onClick={() => navigate('/my-resumes')}
              className="btn btn-secondary"
            >
              View All
            </button>
          </div>

          {/* Subscription Status Card */}
          <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Subscription</h2>
            <p className="text-gray-600 mb-4">
              Current Plan: <span className="font-semibold">{user?.subscription?.type || 'Free'}</span>
            </p>
            <button
              onClick={() => navigate('/subscription')}
              className="btn btn-secondary"
            >
              Manage Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
