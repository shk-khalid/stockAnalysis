import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landingPage';
import { LoginForm } from './components/auth/loginForm';
import { RegisterForm } from './components/auth/registerForm';
import { DashboardPage } from './pages/dashboardPage';
import { useAuth } from './hooks/useAuth';
import { Loading } from './components/common/loading';
import { Toaster } from 'react-hot-toast';
import { sessionService } from './services/sessionService';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  useEffect(() => {
    // Initialize session monitoring
    sessionService.init();

    // Cleanup on component unmount
    return () => {
      sessionService.cleanup();
    };
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#0f172a',
            color: '#f9fafb',
            border: '1px solid #1e293b',
          },
        }}
      />
    </div>
  );
}

export default App;
