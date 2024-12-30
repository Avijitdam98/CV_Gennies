import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';
import DarkModeToggle from './components/common/DarkModeToggle';
import IconButton from '@mui/material/IconButton';
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
import Preview from './pages/Preview.jsx';

const App = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#3B82F6',
            light: '#60A5FA',
            dark: '#2563EB',
          },
          background: {
            default: mode === 'dark' ? '#0A1929' : '#F3F4F6',
            paper: mode === 'dark' ? '#1E293B' : '#FFFFFF',
          },
          text: {
            primary: mode === 'dark' ? '#E2E8F0' : '#1E293B',
            secondary: mode === 'dark' ? '#94A3B8' : '#64748B',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            color: mode === 'dark' ? '#F1F5F9' : '#1E293B',
            fontWeight: 700,
          },
          h2: {
            color: mode === 'dark' ? '#F1F5F9' : '#1E293B',
            fontWeight: 600,
          },
          h3: {
            color: mode === 'dark' ? '#F1F5F9' : '#1E293B',
            fontWeight: 600,
          },
          h4: {
            color: mode === 'dark' ? '#F1F5F9' : '#1E293B',
            fontWeight: 500,
          },
          h5: {
            color: mode === 'dark' ? '#F1F5F9' : '#1E293B',
            fontWeight: 500,
          },
          h6: {
            color: mode === 'dark' ? '#F1F5F9' : '#1E293B',
            fontWeight: 500,
          },
          body1: {
            color: mode === 'dark' ? '#E2E8F0' : '#334155',
          },
          body2: {
            color: mode === 'dark' ? '#CBD5E1' : '#475569',
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: mode === 'dark' ? '#475569 #1E293B' : '#94A3B8 #F1F5F9',
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                  borderRadius: 8,
                  backgroundColor: mode === 'dark' ? '#475569' : '#94A3B8',
                  minHeight: 24,
                },
                '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                  borderRadius: 8,
                  backgroundColor: mode === 'dark' ? '#1E293B' : '#F1F5F9',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="min-h-screen">
            <DarkModeToggle toggleColorMode={toggleColorMode} />
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                },
              }} 
            />
            <Navbar />
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
                <Route path="/preview/:templateId" element={<Preview />} />
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
      </ThemeProvider>
    </Provider>
  );
};

export default App;
