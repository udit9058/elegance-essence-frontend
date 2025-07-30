import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isValidating, setIsValidating] = useState(false);

  const login = (token, userData) => {
    console.log('AuthContext login:', { token, userData });
    setUser({ ...userData, role: 'seller' });
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const logout = async () => {
    console.log('AuthContext logout called');
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await api.post('/seller/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Logout API successful');
      } catch (err) {
        console.error('Logout API failed:', err.response?.data || err.message);
      }
    }
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const validateToken = useCallback(async () => {
    if (isValidating) {
      console.log('validateToken skipped: already validating');
      return null;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log('validateToken: no token found');
      setIsLoggedIn(false);
      return null;
    }

    setIsValidating(true);
    try {
      console.log('validateToken: fetching /seller/profile');
      const response = await api.get('/seller/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('validateToken: profile fetched', response.data);
      setUser({ ...response.data, role: 'seller' });
      setIsLoggedIn(true);
      return response.data;
    } catch (err) {
      console.error('validateToken failed:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        console.log('validateToken: 401, triggering logout');
        await logout();
      }
      return null;
    } finally {
      setIsValidating(false);
    }
  }, [isValidating]);

  useEffect(() => {
    console.log('AuthContext useEffect: initial validateToken');
    validateToken();
  }, [validateToken]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};