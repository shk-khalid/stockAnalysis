import { useEffect, memo } from 'react';
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
const ProtectedRoute = memo(({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, initialized } = useAuth();
  const location = useLocation();

  if (!initialized || loading) {
    return <Loading fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
});

ProtectedRoute.displayName = 'ProtectedRoute';

function App() {
  const { isAuthenticated, loading, initialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!initialized) return;

    if (isAuthenticated) {
      sessionService.init();
      return () => {
        sessionService.cleanup();
      };
    } else {
      const publicPaths = ['/', '/login', '/register'];
      if (!publicPaths.includes(location.pathname)) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, initialized, navigate, location.pathname]);

  if (!initialized || loading) {
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