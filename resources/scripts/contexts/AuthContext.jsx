import React, { createContext, useState, useEffect } from 'react';

import useAuth from './hooks/useAuth.jsx';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {
    UserLevel, loading, handleLogin, handleLogout
  } = useAuth();

  return (
    <AuthContext.Provider value={{ loading, UserLevel, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };