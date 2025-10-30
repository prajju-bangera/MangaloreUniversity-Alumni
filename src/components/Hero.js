import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './Hero.css';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [countedStats, setCountedStats] = useState({
    alumni: 0,
    mentorship: 0,
    events: 0
  });
  
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);
  const { user } = useAuth();

  const universityTexts = [
    "Mangalore University",
  ];

  // Stats data with target values
  const statsData = [
    { id: 'alumni', target: 10000, label: 'Alumni Members' },
    { id: 'mentorship', target: 500, label: 'Mentorship Pairs' },
    { id: 'events', target: 100, label: 'Events Yearly' }
  ];

  // Membership Form State
  const [membershipForm, setMembershipForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    passoutYear: '',
    currentAddress: '',
    degree: '',
    usn: '',
    paymentScreenshot: null
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UPI Payment Details
  const upiDetails = {
    id: 'mualumni@upi',
    name: 'Mangalore University Alumni',
    amount: '300'
  };

  // QR Code/Scanner Image
  const scannerImage = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UPI%3A%2F%2Fpay%3Fpa%3Dmualumni%40upi%26pn%3DMangalore%20University%20Alumni%26am%3D300%26cu%3DINR";

  // Upcoming Events Data
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Alumni Meet 2024",
      date: "Dec 15, 2024",
      time: "6:00 PM",
      location: "University Campus Auditorium",
      type: "Networking",
      attendees: "500+",
      description: "Join us for the biggest alumni gathering of the year. Reconnect with old friends and make new connections."
    },
    {
      id: 2,
      title: "Career Guidance Workshop",
      date: "Jan 10, 2025",
      time: "3:00 PM",
      location: "Online - Zoom",
      type: "Workshop",
      attendees: "200+",
      description: "Learn from industry experts about career growth opportunities and skill development."
    },
    {
      id: 3,
      title: "Industry Connect 2025",
      date: "Feb 20, 2025",
      time: "9:00 AM",
      location: "Bangalore Convention Center",
      type: "Conference",
      attendees: "300+",
      description: "Annual industry-alumni connect conference featuring keynote speakers and networking sessions."
    },
    {
      id: 4,
      title: "Mentorship Program Launch",
      date: "Dec 20, 2024",
      time: "4:00 PM",
      location: "University Library Hall",
      type: "Program",
      attendees: "150+",
      description: "Official launch of our new alumni-student mentorship program."
    }
  ];

  // Typing effect for university text
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;
    const current = currentText % universityTexts.length;
    const fullText = universityTexts[current];

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentText((current + 1) % universityTexts.length);
      }

      setDisplayText(
        isDeleting 
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentText, universityTexts]);

  // Counting animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            // Animate each stat
            statsData.forEach((stat) => {
              const duration = 2000; // 2 seconds
              const steps = 60;
              const increment = stat.target / steps;
              let current = 0;
              
              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                  current = stat.target;
                  clearInterval(timer);
                }
                
                setCountedStats(prev => ({
                  ...prev,
                  [stat.id]: Math.floor(current)
                }));
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const handleJoinNow = () => {
    if (user) {
      // User is logged in, show membership form
      setShowMembershipForm(true);
    } else {
      // User is not logged in, show warning
      setShowLoginWarning(true);
    }
  };

  const handleViewEvents = () => {
    setShowEvents(!showEvents);
  };

  const handleRSVP = (eventTitle) => {
    alert(`RSVP confirmed for ${eventTitle}!`);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num + '+';
  };

  // Membership Form Handlers
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'paymentScreenshot') {
      setMembershipForm(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setMembershipForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!membershipForm.name.trim()) errors.name = 'Name is required';
    if (!membershipForm.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(membershipForm.email)) errors.email = 'Email is invalid';
    
    if (!membershipForm.whatsapp.trim()) errors.whatsapp = 'WhatsApp number is required';
    else if (!/^\d{10}$/.test(membershipForm.whatsapp)) errors.whatsapp = 'Valid 10-digit WhatsApp number required';
    
    if (!membershipForm.passoutYear) errors.passoutYear = 'Passout year is required';
    if (!membershipForm.currentAddress.trim()) errors.currentAddress = 'Current address is required';
    if (!membershipForm.degree.trim()) errors.degree = 'Degree is required';
    if (!membershipForm.usn.trim()) errors.usn = 'USN is required';
    if (!membershipForm.paymentScreenshot) errors.paymentScreenshot = 'Payment screenshot is required';
    
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', membershipForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Membership application submitted successfully! We will review your application and get back to you soon.');
      setShowMembershipForm(false);
      setShowScanner(false);
      setMembershipForm({
        name: '',
        email: '',
        whatsapp: '',
        passoutYear: '',
        currentAddress: '',
        degree: '',
        usn: '',
        paymentScreenshot: null
      });
    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText(upiDetails.id);
    alert('UPI ID copied to clipboard!');
  };

  const handleScannerClick = () => {
    setShowScanner(!showScanner);
  };

  const isFormValid = () => {
    return Object.values(membershipForm).every(value => 
      value !== '' && value !== null
    );
  };

  const handleLoginWarningClose = () => {
    setShowLoginWarning(false);
  };

  return (
    <section className="hero" id="home">
      {/* Background Image */}
      <div className="hero-background">
        <div className="image-overlay1"></div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/29/Entrance_of_Mangalore_University_in_Konaje.jpg" 
          alt="Mangalore University Entrance"
          className="hero-image"
        />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line welcome-text">Welcome to the</span>
            <span className="title-line university-text">
              <span className="typed-university-text">{displayText}</span>
              <span className="cursor">|</span>
            </span>
            <span className="title-line alumni-text">Alumni Network</span>
          </h1>
          
          <p className="hero-subtitle">
            Reconnect. Reminisce. Reignite.
          </p>

          {/* Quick Links */}
          <div className="quick-links">
            <button className="quick-link-btn primary" onClick={handleJoinNow}>
              Join Now
            </button>
            {/* <button 
              className={`quick-link-btn secondary ${showEvents ? 'active' : ''}`}
              onClick={handleViewEvents}
            >
              {showEvents ? 'Hide Events' : 'Upcoming Events'}
            </button> */}
          </div>

          {/* Enhanced Stats Section */}
          <div className="hero-stats" ref={statsRef}>
            {statsData.map((stat) => (
              <div key={stat.id} className="stat">
                <div className="stat-number">
                  {formatNumber(countedStats[stat.id])}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Required Warning */}
      {showLoginWarning && (
        <div className="login-warning-overlay">
          <div className="login-warning-container">
            <div className="login-warning-header">
              <div className="login-warning-icon">🔒</div>
              <h3>Login Required</h3>
              <button 
                className="login-warning-close-btn"
                onClick={handleLoginWarningClose}
              >
                ✕
              </button>
            </div>
            
            <div className="login-warning-content">
              <p>You need to be logged in to access the alumni membership form.</p>
              <p>Please login to your account to continue with the registration process.</p>
            </div>
            
            <div className="login-warning-actions">
              <button 
                className="login-warning-cancel-btn"
                onClick={handleLoginWarningClose}
              >
                Cancel
              </button>
              <button 
                className="login-warning-login-btn"
                onClick={() => {
                  // This will trigger the login modal from Navbar
                  // You might need to pass a prop or use context to trigger login
                  setShowLoginWarning(false);
                  // You can add logic here to open the login modal
                  // For now, we'll just show an alert
                  alert('Please use the Login button in the navigation bar to sign in.');
                }}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alumni Membership Form Popup */}
      {showMembershipForm && user && (
        <div className="alumni-membership-overlay">
          <div className="alumni-membership-form-container">
            <div className="alumni-membership-header">
              <h2>🎓 Alumni Membership Registration</h2>
              <p className="alumni-membership-subtitle">
                Join our growing network of successful alumni. Membership fee: ₹300
              </p>
              <button 
                className="alumni-membership-close-btn"
                onClick={() => {
                  setShowMembershipForm(false);
                  setShowScanner(false);
                }}
              >
                ✕
              </button>
            </div>

            <form className="alumni-membership-form" onSubmit={handleFormSubmit}>
              <div className="alumni-form-grid">
                {/* Personal Information */}
                <div className="alumni-form-section">
                  <h3 className="alumni-form-section-title">Personal Information</h3>
                  
                  <div className="alumni-form-group">
                    <label htmlFor="name" className="alumni-form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={membershipForm.name}
                      onChange={handleFormChange}
                      className={`alumni-form-input ${formErrors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && <span className="alumni-form-error">{formErrors.name}</span>}
                  </div>

                  <div className="alumni-form-row">
                    <div className="alumni-form-group">
                      <label htmlFor="email" className="alumni-form-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={membershipForm.email}
                        onChange={handleFormChange}
                        className={`alumni-form-input ${formErrors.email ? 'error' : ''}`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && <span className="alumni-form-error">{formErrors.email}</span>}
                    </div>

                    <div className="alumni-form-group">
                      <label htmlFor="whatsapp" className="alumni-form-label">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={membershipForm.whatsapp}
                        onChange={handleFormChange}
                        className={`alumni-form-input ${formErrors.whatsapp ? 'error' : ''}`}
                        placeholder="9876543210"
                      />
                      {formErrors.whatsapp && <span className="alumni-form-error">{formErrors.whatsapp}</span>}
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="alumni-form-section">
                  <h3 className="alumni-form-section-title">Academic Information</h3>
                  
                  <div className="alumni-form-row">
                    <div className="alumni-form-group">
                      <label htmlFor="degree" className="alumni-form-label">
                        Degree/Course *
                      </label>
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={membershipForm.degree}
                        onChange={handleFormChange}
                        className={`alumni-form-input ${formErrors.degree ? 'error' : ''}`}
                        placeholder="e.g., B.Sc, M.Com, MBA"
                      />
                      {formErrors.degree && <span className="alumni-form-error">{formErrors.degree}</span>}
                    </div>

                    <div className="alumni-form-group">
                      <label htmlFor="passoutYear" className="alumni-form-label">
                        Passout Year *
                      </label>
                      <select
                        id="passoutYear"
                        name="passoutYear"
                        value={membershipForm.passoutYear}
                        onChange={handleFormChange}
                        className={`alumni-form-input ${formErrors.passoutYear ? 'error' : ''}`}
                      >
                        <option value="">Select Year</option>
                        {Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {formErrors.passoutYear && <span className="alumni-form-error">{formErrors.passoutYear}</span>}
                    </div>
                  </div>

                  <div className="alumni-form-group">
                    <label htmlFor="usn" className="alumni-form-label">
                      University Seat Number (USN) *
                    </label>
                    <input
                      type="text"
                      id="usn"
                      name="usn"
                      value={membershipForm.usn}
                      onChange={handleFormChange}
                      className={`alumni-form-input ${formErrors.usn ? 'error' : ''}`}
                      placeholder="e.g., 4MU20CS001"
                    />
                    {formErrors.usn && <span className="alumni-form-error">{formErrors.usn}</span>}
                  </div>

                  <div className="alumni-form-group">
                    <label htmlFor="currentAddress" className="alumni-form-label">
                      Current Address *
                    </label>
                    <textarea
                      id="currentAddress"
                      name="currentAddress"
                      value={membershipForm.currentAddress}
                      onChange={handleFormChange}
                      className={`alumni-form-input alumni-form-textarea ${formErrors.currentAddress ? 'error' : ''}`}
                      placeholder="Enter your complete current address"
                      rows="3"
                    />
                    {formErrors.currentAddress && <span className="alumni-form-error">{formErrors.currentAddress}</span>}
                  </div>
                </div>

                {/* Payment Section */}
                <div className="alumni-form-section">
                  <h3 className="alumni-form-section-title">Payment Details</h3>
                  <div className="alumni-payment-info">
                    <div className="alumni-payment-amount">
                      <span className="alumni-payment-label">Membership Fee:</span>
                      <span className="alumni-payment-value">₹300</span>
                    </div>
                    
                    <div className="alumni-upi-section">
                      <div className="alumni-upi-header">
                        <span className="alumni-upi-title">UPI Payment</span>
                        <div className="alumni-upi-buttons">
                          <button type="button" className="alumni-upi-copy-btn" onClick={copyUPIId}>
                            📋 Copy UPI ID
                          </button>
                          <button type="button" className="alumni-upi-scanner-btn" onClick={handleScannerClick}>
                            📱 Pay using Scanner
                          </button>
                        </div>
                      </div>
                      <div className="alumni-upi-details">
                        <div className="alumni-upi-id">
                          <strong>UPI ID:</strong> {upiDetails.id}
                        </div>
                        <div className="alumni-upi-name">
                          <strong>Name:</strong> {upiDetails.name}
                        </div>
                      </div>
                      <p className="alumni-upi-instructions">
                        Send ₹300 to the above UPI ID and upload the payment screenshot below.
                      </p>

                      {/* Scanner Image Display */}
                      {showScanner && (
                        <div className="alumni-scanner-container">
                          <div className="alumni-scanner-header">
                            <h4>Scan to Pay</h4>
                            <p>Use any UPI app to scan this QR code</p>
                          </div>
                          <div className="alumni-scanner-image">
                            <img 
                              src={scannerImage} 
                              alt="UPI QR Code for Payment" 
                              className="alumni-qr-code"
                            />
                          </div>
                          <div className="alumni-scanner-instructions">
                            <p><strong>Instructions:</strong></p>
                            <ol>
                              <li>Open your UPI payment app (Google Pay, PhonePe, Paytm, etc.)</li>
                              <li>Tap on 'Scan QR Code'</li>
                              <li>Scan the QR code above</li>
                              <li>Enter amount: ₹300 and complete payment</li>
                              <li>Take a screenshot of the payment confirmation</li>
                              <li>Upload the screenshot below</li>
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="alumni-form-group">
                      <label htmlFor="paymentScreenshot" className="alumni-form-label">
                        Payment Screenshot *
                      </label>
                      <input
                        type="file"
                        id="paymentScreenshot"
                        name="paymentScreenshot"
                        onChange={handleFormChange}
                        className={`alumni-form-file-input ${formErrors.paymentScreenshot ? 'error' : ''}`}
                        accept="image/*,.pdf"
                      />
                      {formErrors.paymentScreenshot && (
                        <span className="alumni-form-error">{formErrors.paymentScreenshot}</span>
                      )}
                      {membershipForm.paymentScreenshot && (
                        <div className="alumni-file-preview">
                          ✅ {membershipForm.paymentScreenshot.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="alumni-form-actions">
                <button
                  type="button"
                  className="alumni-form-cancel-btn"
                  onClick={() => {
                    setShowMembershipForm(false);
                    setShowScanner(false);
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="alumni-form-submit-btn"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="alumni-loading-spinner"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upcoming Events Popup */}
      {showEvents && (
        <div className="events-popup">
          <div className="events-popup-content">
            <div className="events-header">
              <h2>📅 Upcoming Events</h2>
              <button 
                className="close-events-btn"
                onClick={() => setShowEvents(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="events-list">
              {upcomingEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-date-badge">
                    <div className="event-month">{event.date.split(' ')[0]}</div>
                    <div className="event-day">{event.date.split(' ')[1].replace(',', '')}</div>
                  </div>
                  
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-meta">
                      <div className="event-info">
                        <span className="event-time">🕒 {event.time}</span>
                        <span className="event-location">📍 {event.location}</span>
                      </div>
                      <div className="event-stats">
                        <span className="event-type">{event.type}</span>
                        <span className="event-attendees">👥 {event.attendees}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="event-actions">
                    <button 
                      className="rsvp-btn"
                      onClick={() => handleRSVP(event.title)}
                    >
                      RSVP Now
                    </button>
                    <button className="reminder-btn">
                      Set Reminder
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="events-footer">
              <p>Can't find what you're looking for? <a href="#all-events">View all events</a></p>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;