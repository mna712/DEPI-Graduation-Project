import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

