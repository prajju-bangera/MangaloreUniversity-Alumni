import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import Logo from '../assets/logo.png';
import Login from './Login';
import Register from './Register';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const smoothScrollTo = (element, duration = 800) => {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const navItems = [
    { 
      name: 'About Us', 
      sectionId: 'about-page',
      dropdown: [
        { 
          name: 'University History', 
          sectionId: 'university-history',
          type: 'section'
        },
        { 
          name: 'Alumni Association Objectives', 
          href: '/alumni-objectives',
          type: 'page'
        },
        { 
          name: 'Organizational Structure', 
          href: '/organization-structure',
          type: 'page'
        },
      ]
    },
    { 
      name: 'Alumni Network', 
      href: '/alumni-network',
      type: 'page'
    },
    { 
      name: 'Notable Alumni', 
      href: '/notable-alumni',
      type: 'page'
    },
    { 
      name: 'News & Events', 
      sectionId: 'news-page',
      type: 'section',
      dropdown: [
        { 
          name: 'News', 
          sectionId: 'news-page',
          type: 'section'
        },
        { 
          name: 'Events', 
          sectionId: 'events-page',
          type: 'section'
        }
      ]
    },
    { 
      name: 'Gallery', 
      sectionId: 'gallery-page',
      type: 'section'
    },
    { 
      name: 'Contact Us', 
      sectionId: 'contact-page',
      type: 'section'
    }
  ];

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        smoothScrollTo(sectionElement);
        window.history.pushState(null, '', `/#${sectionId}`);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleNavClick = (item) => {
    if (item.dropdown) return;

    if (item.href) {
      navigate(item.href);
    } else if (item.sectionId) {
      scrollToSection(item.sectionId);
    }
    
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (dropdownItem) => {
    if (dropdownItem.href) {
      navigate(dropdownItem.href);
    } else if (dropdownItem.sectionId) {
      scrollToSection(dropdownItem.sectionId);
    }
    
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  };

  const handleMobileNavClick = (item) => {
    if (item.dropdown) {
      setMobileDropdown(mobileDropdown === item.name ? null : item.name);
    } else {
      handleNavClick(item);
    }
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
    setAuthMode('login');
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <div 
            className="nav-logo" 
            onClick={handleLogoClick}
            style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem'}}
          >
            <div className="logo-container">
              <img src={Logo} alt="Mangalore University Logo" className="logo-image" />
            </div>
            <div className="logo-text-container">
              <span className="logo-text">Mangalore University</span>
              <span className="logo-subtitle">Alumni Network</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links-right">
            {navItems.map((item, index) => (
              <div 
                key={item.name} 
                className="nav-item"
                onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div 
                  onClick={() => handleNavClick(item)}
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-link-text">{item.name}</span>
                  {item.dropdown && (
                    <span className="dropdown-arrow">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </div>

                {/* Hover Line */}
                <div className="nav-link-underline"></div>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                    <div className="dropdown-arrow-top"></div>
                    {item.dropdown.map((dropItem, dropIndex) => (
                      <div 
                        key={dropItem.name} 
                        onClick={() => handleDropdownClick(dropItem)}
                        className="dropdown-link"
                        style={{ animationDelay: `${dropIndex * 0.05}s`, cursor: 'pointer' }}
                      >
                        <div className="dropdown-icon">
                          <div className="icon-dot"></div>
                        </div>
                        <span>{dropItem.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Auth Button */}
            {user ? (
              <ProfileDropdown />
            ) : (
              <button className="btn-login" onClick={handleAuthClick}>
                <span className="btn-text">LOGIN</span>
                <div className="btn-hover-effect"></div>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="menu-bars">
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <div className="mobile-logo" onClick={handleLogoClick}>
                <img src={Logo} alt="Mangalore University Logo" className="logo-image" />
                <div className="mobile-logo-text">
                  <span className="logo-text">Mangalore University</span>
                  <span className="logo-subtitle">Alumni Network</span>
                </div>
              </div>
              <button 
                className="mobile-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="mobile-nav-items">
              {navItems.map((item) => (
                <div key={item.name} className="mobile-nav-item">
                  <div 
                    className="mobile-nav-link" 
                    onClick={() => handleMobileNavClick(item)}
                  >
                    <div className="mobile-link-content">
                      <span className="mobile-link-text">{item.name}</span>
                      {item.dropdown && (
                        <span className={`mobile-dropdown-arrow ${mobileDropdown === item.name ? 'active' : ''}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                  {item.dropdown && (
                    <div className={`mobile-dropdown ${mobileDropdown === item.name ? 'active' : ''}`}>
                      {item.dropdown.map(dropItem => (
                        <div 
                          key={dropItem.name} 
                          onClick={() => handleDropdownClick(dropItem)}
                          className="mobile-dropdown-link" 
                        >
                          <div className="mobile-dropdown-icon"></div>
                          <span>{dropItem.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mobile-auth">
              {user ? (
                <div className="mobile-profile">
                  <div className="mobile-profile-avatar">
                    {user.avatar}
                  </div>
                  <span className="mobile-profile-name">{user.name}</span>
                </div>
              ) : (
                <button className="btn-login-mobile" onClick={handleAuthClick}>
                  <span>LOGIN</span>
                  <div className="btn-mobile-effect"></div>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modals */}
      {showAuthModal && (
        authMode === 'login' ? (
          <Login 
            onClose={handleCloseAuth} 
            switchToRegister={() => switchAuthMode('register')} 
          />
        ) : (
          <Register 
            onClose={handleCloseAuth} 
            switchToLogin={() => switchAuthMode('login')} 
          />
        )
      )}
    </>
  );
};

export default Navbar;