import { createContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //SignOut
  const signOut = () => {
    const itemRemove = ['token', 'userInfo', 'secret'];
    itemRemove.forEach(item => {
      localStorage.removeItem(item);
    });

    window.location.replace('/login');
    return;
  };

  const contextValue = {
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
