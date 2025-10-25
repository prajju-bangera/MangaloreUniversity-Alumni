import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [countedStats, setCountedStats] = useState({
    alumni: 0,
    mentorship: 0,
    events: 0
  });
  
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);

  const universityTexts = [
    "Mangalore University",
  ];

  // Stats data with target values
  const statsData = [
    { id: 'alumni', target: 10000, label: 'Alumni Members' },
    { id: 'mentorship', target: 500, label: 'Mentorship Pairs' },
    { id: 'events', target: 100, label: 'Events Yearly' }
  ];

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
      { threshold: 0.5 }
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
    // Handle join now action
    alert('Redirecting to registration page...');
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

  return (
    <section className="hero" id="home">
      {/* Background Image */}
      <div className="hero-background">
        <div className="image-overlay"></div>
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
              {/* <span className="quick-link-icon"></span> */}
              Join Now
            </button>
            <button 
              className={`quick-link-btn secondary ${showEvents ? 'active' : ''}`}
              onClick={handleViewEvents}
            >
              {/* <span className="quick-link-icon">📅</span> */}
              {showEvents ? 'Hide Events' : 'Upcoming Events'}
            </button>
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