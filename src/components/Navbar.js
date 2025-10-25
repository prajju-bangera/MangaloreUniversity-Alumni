import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'About Us', 
      href: '#about',
      dropdown: [
        { name: 'University History in Brief', href: '#history' },
        { name: 'Alumni Association Objectives', href: '#objectives' },
        { name: 'Vision & Mission', href: '#vision-mission' },
        { name: 'Organizational Structure', href: '#structure' },
        { name: 'Messages from Chancellor / Vice-Chancellor', href: '#chancellor' },
        { name: 'Messages from Alumni President / Secretary', href: '#president' }
      ]
    },
    { name: 'Alumni Network', href: '#alumni-network' },
    { name: 'Notable Alumni', href: '#notable-alumni' },
    { 
      name: 'News & Events', 
      href: '#news',
      dropdown: [
        { name: 'Upcoming Alumni Meets & Webinars', href: '#upcoming-events' },
        { name: 'Annual Reunion / Homecoming', href: '#reunion' },
        { name: 'Alumni Spotlights / Achievements', href: '#alumni-spotlights' },
        { name: 'Career or Life Stories from Alumni', href: '#career-stories' }
      ]
    },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Animated Background Overlay */}
      <div className="nav-background-overlay"></div>
      
      <div className="nav-container">
        {/* Logo with Enhanced Animation */}
        <div 
          className="nav-logo" 
          onClick={() => window.location.href = '/'} 
          style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem'}}
        >
          <div className="logo-container">
            <img src={Logo} alt="Mangalore University Logo" className="logo-image" />
            <div className="logo-glow"></div>
          </div>
          <div className="logo-text-container">
            <span className="logo-text">Mangalore University</span>
            <span className="logo-subtitle">Alumni Network</span>
          </div>
        </div>

        {/* Desktop Links - Premium Design */}
        <div className="nav-links-right">
          {navItems.map((item, index) => (
            <div 
              key={item.name} 
              className="nav-item"
              onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href={item.href} className="nav-link">
                <span className="nav-link-text">{item.name}</span>
                {item.dropdown && (
                  <span className="dropdown-arrow">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </a>

              {/* Animated Hover Line */}
              <div className="nav-link-underline"></div>

              {/* Premium Dropdown */}
              {item.dropdown && (
                <div className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                  <div className="dropdown-arrow-top"></div>
                  {item.dropdown.map((dropItem, dropIndex) => (
                    <a 
                      key={dropItem.name} 
                      href={dropItem.href} 
                      className="dropdown-link"
                      style={{ animationDelay: `${dropIndex * 0.05}s` }}
                    >
                      <div className="dropdown-icon">
                        <div className="icon-dot"></div>
                      </div>
                      <span>{dropItem.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Premium Auth Button */}
          <button className="btn-login">
            <span className="btn-text">LOGIN</span>
            <div className="btn-hover-effect"></div>
          </button>
        </div>

        {/* Enhanced Mobile Menu Toggle */}
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

      {/* Premium Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-logo" onClick={() => window.location.href = '/'}>
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
            {navItems.map((item, index) => (
              <div key={item.name} className="mobile-nav-item">
                <div 
                  className="mobile-nav-link" 
                  onClick={() => item.dropdown ? setMobileDropdown(mobileDropdown === index ? null : index) : setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-link-content">
                    <span className="mobile-link-text">{item.name}</span>
                    {item.dropdown && (
                      <span className={`mobile-dropdown-arrow ${mobileDropdown === index ? 'active' : ''}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                          <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
                {item.dropdown && (
                  <div className={`mobile-dropdown ${mobileDropdown === index ? 'active' : ''}`}>
                    {item.dropdown.map(dropItem => (
                      <a 
                        key={dropItem.name} 
                        href={dropItem.href} 
                        className="mobile-dropdown-link" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="mobile-dropdown-icon"></div>
                        <span>{dropItem.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mobile-auth">
            <button className="btn-login-mobile">
              <span>LOGIN</span>
              <div className="btn-mobile-effect"></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;