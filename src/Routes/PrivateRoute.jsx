import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const [data, isPending] = useAuth();

  const username = localStorage.getItem('userInfo') || null;
  const secret = localStorage.getItem('secret') || null;

  if (!username || !secret) {
    return <Navigate to="/login"></Navigate>;
  }

  if (isPending) {
    return <div>Loading......</div>;
  }
  if (data?.isVerified) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};

export default PrivateRoute;
