import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import PageContainer from './components/layout/PageContainer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Templates from './pages/Templates';
import ResumeBuilder from './pages/ResumeBuilder';
import MyResumes from './pages/MyResumes';
import SharedResume from './pages/SharedResume';
import Subscription from './pages/Subscription';
import AdminDashboard from './components/admin/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Features from './pages/Features.jsx';
import Pricing from './pages/Pricing.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Help from './pages/Help.jsx';
import CareerAdvice from './pages/CareerAdvice.jsx';
import Tips from './pages/Tips.jsx';
import Examples from './pages/Examples.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-right" />
          <PageContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/help" element={<Help />} />
              <Route path="/career-advice" element={<CareerAdvice />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/resume-builder/:id" element={<ResumeBuilder />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-resume"
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-resume/:id"
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-resumes"
                element={
                  <ProtectedRoute>
                    <MyResumes />
                  </ProtectedRoute>
                }
              />
              <Route path="/shared/:id" element={<SharedResume />} />
              <Route
                path="/subscription"
                element={
                  <ProtectedRoute>
                    <Subscription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </PageContainer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
