import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(false);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, setLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
