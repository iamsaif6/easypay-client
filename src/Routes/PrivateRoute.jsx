import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const [data, isPending] = useAuth();
  console.log('private route rendered', isPending);
  if (isPending) {
    return <div>Loading</div>;
  }
  if (data.isVerified) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};

export default PrivateRoute;
