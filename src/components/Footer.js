// components/Footer.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import footerLogo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
                 <div className="footer-logo">
              <img 
                src={footerLogo} 
                alt="Mangalore University Alumni" 
                className="footerlogo-image"
              />
              <span className="logo-text">Mangalore University Alumni</span>
            </div>
            <p className="footer-description">
              Connecting generations of students and alumni to build a stronger community 
              and create lasting impact through networking, mentorship, and collaboration.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section quick-links-section1">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link 
                  to="/" 
                  onClick={() => handleNavigation('/')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={() => handleNavigation('/about')}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  onClick={() => handleNavigation('/events')}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  onClick={() => handleNavigation('/gallery')}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/membership" 
                  onClick={() => handleNavigation('/membership')}
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={() => handleNavigation('/contact')}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div className="footer-section contact-social-section">
            {/* Contact & Follow Header */}
            <div className="contact-follow-header">
              <h3 className="footer-heading">Contact Us</h3>
              <span className="header-separator">|</span>
              <h3 className="footer-heading">Follow Us</h3>
            </div>

            {/* Contact & Social Content */}
            <div className="contact-social-content">
              {/* Contact Information */}
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon1">🌐</div>
                  <div className="contact-links">
                    <a 
                      href="https://mangaloreuniversityalumni.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleExternalLink('https://mangaloreuniversityalumni.com');
                      }}
                    >
                      mangaloreuniversityalumni.com
                    </a>
                    <a 
                      href="https://mangaloreuniversityalumni.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleExternalLink('https://mangaloreuniversityalumni.org');
                      }}
                    >
                      mangaloreuniversityalumni.org
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon1">📞</div>
                  <p className="phone">+91 824 123 4567</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="social-links">
                <a 
                  href="https://facebook.com/mangaloreuniversityalumni" 
                  className="social-link facebook"
                  aria-label="Facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    handleExternalLink('https://facebook.com/mangaloreuniversityalumni');
                  }}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="social-text">Facebook</span>
                </a>
                
                <a 
                  href="https://linkedin.com/company/mangalore-university-alumni" 
                  className="social-link linkedin"
                  aria-label="LinkedIn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleExternalLink('https://linkedin.com/company/mangalore-university-alumni');
                  }}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="social-text">LinkedIn</span>
                </a>
                
                <a 
                  href="https://twitter.com/mangalore_uni_alumni" 
                  className="social-link twitter"
                  aria-label="Twitter"
                  onClick={(e) => {
                    e.preventDefault();
                    handleExternalLink('https://twitter.com/mangalore_uni_alumni');
                  }}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span className="social-text">Twitter</span>
                </a>
                
                <a 
                  href="https://instagram.com/mangaloreuniversityalumni" 
                  className="social-link instagram"
                  aria-label="Instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    handleExternalLink('https://instagram.com/mangaloreuniversityalumni');
                  }}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="social-text">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              {currentYear} Mangalore University Alumni Association. All rights reserved.
            </div>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="separator">•</span>
              <Link to="/terms">Terms of Use</Link>
              <span className="separator">•</span>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;