import { createContext } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //SignOut
  const signOut = () => {
    localStorage.removeItem('token', 'userInfo', 'secret');
    return <Navigate to="/login" />;
  };

  const contextValue = {
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
