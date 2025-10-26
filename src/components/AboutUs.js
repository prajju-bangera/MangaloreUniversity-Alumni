import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  
  const sectionRefs = {
    hero: useRef(null),
    history: useRef(null),
    objectives: useRef(null),
    messages: useRef(null),
    cta: useRef(null)
  };

  const leadershipMessages = [
    {
      id: 'chancellor',
      title: "Chancellor",
      name: "Dr. S. R. Niranjan",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      content: "It gives me immense pleasure to witness the remarkable journey of Mangalore University and its alumni community. Our alumni are our greatest ambassadors, carrying forward the legacy of excellence and values instilled during their time at the university."
    },
    {
      id: 'viceChancellor',
      title: "Vice-Chancellor",
      name: "Dr. P. S. Yadapadithaya",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      content: "Mangalore University takes great pride in its alumni who have excelled in various fields across the globe. The Alumni Association plays a crucial role in fostering lifelong connections and contributing to the university's growth."
    },
    {
      id: 'president',
      title: "Alumni President",
      name: "Mr. Rajesh Kumar",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      content: "As alumni, we carry the torch of Mangalore University's rich tradition wherever we go. Our association is committed to creating meaningful engagements and supporting the university's development initiatives."
    },
    {
      id: 'secretary',
      title: "Alumni Secretary",
      name: "Ms. Priya Sharma",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      content: "The Alumni Association is dedicated to strengthening the bond between the university and its graduates. Through various programs and initiatives, we aim to create a vibrant community that supports professional growth and social responsibility."
    }
  ];

  const objectives = [
    "Build strong relationships among alumni and the university",
    "Provide mentorship and career guidance for current students",
    "Create a worldwide network for professional growth",
    "Support university development through fundraising",
    "Celebrate alumni achievements and success stories"
  ];

  // Auto-slide effect for leadership messages
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % leadershipMessages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(slideInterval);
  }, [leadershipMessages.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Scroll animation observer
  useEffect(() => {
    const observers = [];
    
    Object.keys(sectionRefs).forEach(sectionKey => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [sectionKey]: true
            }));
          }
        },
        { 
          threshold: 0.3,
          rootMargin: '-50px 0px -50px 0px'
        }
      );

      if (sectionRefs[sectionKey].current) {
        observer.observe(sectionRefs[sectionKey].current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="about-us">
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero} 
        className={`about-hero ${visibleSections.hero ? 'visible' : ''}`}
      >
        <div className="about-content">
          <div className="title-container">
            <h1 className="main-title">
              About Us
              <div className="underline-container">
                <div className="underline-gradient"></div>
                <div className="underline-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </h1>
          </div>
        </div>
      </section>

      {/* University History & Objectives */}
      <section 
        ref={sectionRefs.history} 
        className={`history-objectives-section ${visibleSections.history ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="history-objectives-grid">
            {/* Left Side - History & Objectives */}
            <div className="left-content">
              {/* University History */}
              <div className="history-content">
                <h2 className="section-title">Our History</h2>
                <div className="history-text">
                  <p className="fade-in-item">
                    Mangalore University was established on September 10, 1980, to cater to the 
                    higher educational needs of the Dakshina Kannada, Udupi, and Kodagu districts. 
                    Since its inception, the university has been committed to academic excellence, 
                    research innovation, and community service.
                  </p>
                  <p className="fade-in-item">
                    The university received its first accreditation from the National Assessment 
                    and Accreditation Council (NAAC) in 1994 with a Four-Star status, and was 
                    subsequently re-accredited with 'A' Grade in 2015, recognizing its commitment 
                    to quality education and research.
                  </p>
                </div>

                {/* Objectives List */}
                <div className="objectives-list">
                  <h3 className="section-subtitle">Our Key Objectives</h3>
                  <div className="objectives-container">
                    {objectives.map((objective, index) => (
                      <div 
                        key={index} 
                        className={`objective-item slide-in-item`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="objective-icon">
                          <div className="icon-circle">
                            <span>{(index + 1)}</span>
                          </div>
                        </div>
                        <div className="objective-text">
                          {objective}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - University Image */}
            <div className="right-content">
              <div className={`university-image-container zoom-in-item`}>
                <img 
                  src="https://media.licdn.com/dms/image/v2/C561BAQExxUD900OKGQ/company-background_10000/company-background_10000/0/1596008216141/mangalore_university_dakshina_kannada_cover?e=2147483647&v=beta&t=5-eums5hyrnl4wayN_Im9H-bUsHUd48Z9FwMouA2DiI" 
                  alt="Mangalore University Campus"
                  className="university-image"
                />
                
              </div>

              {/* Mission & Vision Cards */}
              <div className="mission-vision-cards">
                <div className={`mission-card-compact slide-up-item`}>
                  <div className="card-icon">🎯</div>
                  <div className="card-content">
                    <h4>Our Mission</h4>
                    <p>Strengthen the bond between university and alumni through meaningful engagement and mutual support</p>
                  </div>
                </div>
                
                <div className={`vision-card-compact slide-up-item`}>
                  <div className="card-icon">🌟</div>
                  <div className="card-content">
                    <h4>Our Vision</h4>
                    <p>Create a dynamic global alumni community that actively contributes to university advancement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Association Objectives */}
      {/* <section 
        ref={sectionRefs.objectives} 
        className={`objectives-section ${visibleSections.objectives ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Alumni Association Impact</h2>
          <div className="objectives-grid">
            <div className="impact-card scale-in-item">
              <div className="impact-icon">🤝</div>
              <div className="impact-content">
                <h3>10K+</h3>
                <p>Alumni Connected</p>
              </div>
            </div>
            <div className="impact-card scale-in-item">
              <div className="impact-icon">🎓</div>
              <div className="impact-content">
                <h3>500+</h3>
                <p>Students Mentored</p>
              </div>
            </div>
            <div className="impact-card scale-in-item">
              <div className="impact-icon">🌍</div>
              <div className="impact-content">
                <h3>50+</h3>
                <p>Countries Reached</p>
              </div>
            </div>
            <div className="impact-card scale-in-item">
              <div className="impact-icon">💡</div>
              <div className="impact-content">
                <h3>100+</h3>
                <p>Events Organized</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Leadership Messages Section - Full Width */}
      <section 
        ref={sectionRefs.messages} 
        className={`messages-section ${visibleSections.messages ? 'visible' : ''}`}
      >
        <div className="full-width-container">
          <h2 className="section-title"> Messages From</h2>
          <div className="leadership-slider-full">
            <div className="slider-container-full">
              <div 
                className="slider-track-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {leadershipMessages.map((leader, index) => (
                  <div key={leader.id} className="slide-full">
                    <div className="leader-card-full">
                      <div className="leader-content-full">
                        <div className="leader-info">
                          <div className="leader-photo-container-full">
                            <img 
                              src={leader.photo} 
                              alt={leader.name}
                              className="leader-photo-full"
                            />
                            <div className="photo-overlay-full"></div>
                          </div>
                          <div className="leader-details">
                            <h3 className="leader-title-full">{leader.title}</h3>
                            <h4 className="leader-name-full">{leader.name}</h4>
                          </div>
                        </div>
                        <div className="leader-message-full">
                          <p>{leader.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slider Navigation Dots */}
            <div className="slider-nav-full">
              {leadershipMessages.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot-full ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  <span></span>
                </button>
              ))}
            </div>

            {/* Manual Navigation Buttons */}
            <div className="slider-controls-full">
              <button 
                className="slider-btn-full prev"
                onClick={() => goToSlide((currentSlide - 1 + leadershipMessages.length) % leadershipMessages.length)}
              >
                ‹
              </button>
              <button 
                className="slider-btn-full next"
                onClick={() => goToSlide((currentSlide + 1) % leadershipMessages.length)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  );
};

export default AboutUs;