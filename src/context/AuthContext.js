// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('alumniUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@alumni.edu' && password === 'password') {
          const userData = {
            id: 1,
            name: 'John Doe',
            email: 'demo@alumni.edu',
            avatar: 'JD',
            graduationYear: 2018,
            degree: 'Computer Science',
            phone: '+1 (555) 123-4567',
            bio: 'Software Engineer passionate about AI and Machine Learning. Currently working at Tech Innovations Inc.',
            location: 'San Francisco, CA',
            linkedin: 'john-doe',
            github: 'johndoe',
            eventsAttended: 12,
            jobsPosted: 3,
            memberSince: '2018'
          };
          setUser(userData);
          localStorage.setItem('alumniUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (userData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          avatar: userData.name.split(' ').map(n => n[0]).join(''),
          eventsAttended: 0,
          jobsPosted: 0,
          memberSince: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        };
        setUser(newUser);
        localStorage.setItem('alumniUser', JSON.stringify(newUser));
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alumniUser');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('alumniUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};