import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="profile-avatar">
          {user.avatar}
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu-profile">
          <div className="dropdown-header1">
            <div className="dropdown-avatar">
              {user.avatar}
            </div>
            <div className="dropdown-user-info">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-items">
            <button onClick={handleProfileClick} className="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM8 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              My Profile
            </button>

            <button onClick={handleLogout} className="dropdown-item logout">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7 1h7v14H7v-1h6V2H7V1z"/>
                <path d="M5.5 8l2.5 2.5V9h4V7H8V5.5L5.5 8z"/>
                <path d="M2 7h2v2H2zM0 9h2v2H0zM0 5h2v2H0z"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;