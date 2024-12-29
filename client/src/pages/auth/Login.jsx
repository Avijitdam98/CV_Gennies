import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import { FileText, Mail, Lock, Github, Loader2, Star, Zap, Share2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    // Only redirect if user explicitly logged in
    if (isSuccess) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-600 to-indigo-600">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
      {/* Left side - Hero Section */}
      <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-between text-white backdrop-blur-lg bg-white/10">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-white/20 rounded-lg">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">CV Gennie</h1>
          </div>
          <p className="text-xl mb-12 leading-relaxed">Your AI-powered career companion. Create stunning resumes that stand out and get noticed.</p>
          
          <div className="space-y-6">
            <div className="flex items-center p-6 bg-white/10 rounded-2xl backdrop-blur-md hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-white/20 rounded-xl mr-4">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Professional Templates</h3>
                <p className="text-sm opacity-80">Customizable designs crafted by experts</p>
              </div>
            </div>
            
            <div className="flex items-center p-6 bg-white/10 rounded-2xl backdrop-blur-md hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-white/20 rounded-xl mr-4">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Magic</h3>
                <p className="text-sm opacity-80">Smart suggestions to enhance your content</p>
              </div>
            </div>
            
            <div className="flex items-center p-6 bg-white/10 rounded-2xl backdrop-blur-md hover:bg-white/20 transition-all duration-300">
              <div className="p-3 bg-white/20 rounded-xl mr-4">
                <Share2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Easy Sharing</h3>
                <p className="text-sm opacity-80">Export and share in multiple formats</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm opacity-75">
          2024 CV Gennie. Create your future today.
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome back</h2>
            <p className="text-gray-600">Let's create your perfect resume</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-200" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 group-hover:border-blue-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-200" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 group-hover:border-blue-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
            >
              Sign in
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,12.151L12.545,12.151c0,1.054,0.947,1.91,2.012,1.91h2.969c1.107,0,2.004-0.896,2.004-2.003V7.205 c0-1.107-0.897-2.003-2.004-2.003h-2.969c-1.065,0-2.012,0.856-2.012,1.91v0.246" />
                  <path d="M12.545,12.151L12.545,12.151c0-1.054-0.947-1.91-2.012-1.91H7.564c-1.107,0-2.004,0.896-2.004,2.003v4.853 c0,1.107,0.897,2.003,2.004,2.003h2.969c1.065,0,2.012-0.856,2.012-1.91v-0.246" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
              >
                <Github className="h-5 w-5" />
                GitHub
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign up free
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;