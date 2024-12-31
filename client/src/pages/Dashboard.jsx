import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, FileText, Crown } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Create, manage, and perfect your professional resume
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Create New Resume Card */}
          <div className="group bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20">
            <div className="p-8 lg:p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Resume</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start fresh with our intuitive resume builder. Create a professional resume in minutes.
              </p>
              <button
                onClick={() => navigate('/create-resume')}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-500 transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[1px]"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* My Resumes Card */}
          <div className="group bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20">
            <div className="p-8 lg:p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Resumes</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Access and edit your existing resumes. Keep them updated and ready to share.
              </p>
              <button
                onClick={() => navigate('/my-resumes')}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-500 transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[1px]"
              >
                View All
              </button>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="group bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20">
            <div className="p-8 lg:p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Current Plan: <span className="font-semibold text-purple-600">free</span>
                <br />
                Upgrade for premium features and templates.
              </p>
              <button
                onClick={() => navigate('/subscription')}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[1px]"
              >
                Manage Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;