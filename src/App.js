// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import News from './components/News';
import Events from './components/Events';
import Gallery from './components/Gallery';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import OrganizationStructure from './pages/OrganizationStructure';
import AlumniObjectives from './pages/AlumniObjectives';
import NewsDescription from './pages/NewsDescription';
import Profile from './pages/Profile';

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

  // Easing function for smooth acceleration and deceleration
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

// Scroll to hash handler component
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    // Only handle hash scrolling on home page
    if (pathname === '/' && hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          smoothScrollTo(element);
        }, 300);
      }
    }
  }, [pathname, hash]);

  return null;
};

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Scroll to top when route changes (except when it's just a hash change on home page)
    if (!window.location.hash) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]);

  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="unauthorized-container">
        <div className="unauthorized-content">
          <h2>Access Denied</h2>
          <p>Please log in to access this page.</p>
          <button 
            className="login-redirect-btn"
            onClick={() => window.location.href = '/'}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return children;
};

// Enhanced Home component with section IDs
const Home = () => {
  const { hash } = useLocation();

  React.useEffect(() => {
    // Handle initial hash scroll on home page load
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          smoothScrollTo(element);
        }, 500);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <AboutUs id="about-page" />
      <News id="news-page" />
      <Events id="events-page" />
      <Gallery id="gallery-page" />
      <ContactUs id="contact-page" />
    </>
  );
};

// Simple individual page components (for direct navigation)
const AboutPage = () => <AboutUs id="university-history" />;
const NewsPage = () => <News id="news-page" />;
const EventsPage = () => <Events id="events-page" />;
const GalleryPage = () => <Gallery id="gallery-page" />;
const ContactPage = () => <ContactUs id="contact-page" />;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ScrollToTop />
          <ScrollToHash />
          <Navbar />
          <Routes>
            {/* Home route with all sections */}
            <Route path="/" element={<Home />} />
            
            {/* Individual page routes - keep these for direct URL access */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/organization-structure" element={<OrganizationStructure />} />
            <Route path="/alumni-objectives" element={<AlumniObjectives />} />
            <Route path="/news/:id" element={<NewsDescription />} />

            {/* Protected Routes - Require Authentication */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;