import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Departments from './pages/Departments';
import Correspondence from './pages/Correspondence';
import OfflineMode from './pages/OfflineMode';
import Documents from './pages/Documents';
import Workflows from './pages/Workflows';
import Templates from './pages/Templates';
import ForgotPassword from './pages/ForgotPassword';

import { useAuth } from './context/AuthContext';

// Protected Route Wrapper
const ProtectedRoute = ({ children, feature }: { children: React.ReactNode, feature?: string }) => {
  const { isAuthenticated, hasPermission } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (feature && !hasPermission(feature)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute feature="documents"><Documents /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute feature="reports"><Reports /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute feature="users"><Users /></ProtectedRoute>} />
          <Route path="/departments" element={<ProtectedRoute feature="departments"><Departments /></ProtectedRoute>} />
          <Route path="/correspondence" element={<ProtectedRoute feature="correspondence"><Correspondence /></ProtectedRoute>} />
          <Route path="/workflows" element={<ProtectedRoute feature="workflows"><Workflows /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute feature="templates"><Templates /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/offline" element={<ProtectedRoute><OfflineMode /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
