import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landingPage';
import { LoginForm } from './components/auth/loginForm';
import { RegisterForm } from './components/auth/registerForm';
import { DashboardPage } from './pages/dashboardPage';
import { useAuth } from './hooks/useAuth';
import { Loading } from './components/common/loading';
import { Toaster } from 'react-hot-toast';
import { sessionService } from './services/sessionService';

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function App() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      // Initialize session management when user is authenticated
      sessionService.init();

      // Cleanup on unmount
      return () => {
        sessionService.cleanup();
      };
    } else {
      // If not authenticated and not already on login or register page, redirect to login
      const publicPaths = ['/', '/login', '/register'];
      if (!publicPaths.includes(location.pathname)) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, navigate, location]);

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: 'rgb(var(--color-oxford-blue) / 1)',
            color: 'rgb(var(--color-gold) / 1)',
            border: '1px solid rgb(var(--color-mikado-yellow) / 1)',
          },
        }}
      />
    </div>
  );
}

export default App;