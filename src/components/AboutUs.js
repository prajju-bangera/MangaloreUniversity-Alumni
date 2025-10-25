import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [activeMessage, setActiveMessage] = useState('chancellor');
  const [visibleSections, setVisibleSections] = useState({});
  
  const sectionRefs = {
    hero: useRef(null),
    history: useRef(null),
    objectives: useRef(null),
    messages: useRef(null),
    cta: useRef(null)
  };

  const messages = {
    chancellor: {
      title: "Message from Chancellor",
      name: "Dr. S. R. Niranjan",
      content: "It gives me immense pleasure to witness the remarkable journey of Mangalore University and its alumni community. Our alumni are our greatest ambassadors, carrying forward the legacy of excellence and values instilled during their time at the university."
    },
    viceChancellor: {
      title: "Message from Vice-Chancellor",
      name: "Dr. P. S. Yadapadithaya",
      content: "Mangalore University takes great pride in its alumni who have excelled in various fields across the globe. The Alumni Association plays a crucial role in fostering lifelong connections and contributing to the university's growth."
    },
    president: {
      title: "Message from Alumni President",
      name: "Mr. Rajesh Kumar",
      content: "As alumni, we carry the torch of Mangalore University's rich tradition wherever we go. Our association is committed to creating meaningful engagements and supporting the university's development initiatives."
    }
  };

  const objectives = [
    "Build strong relationships among alumni and the university",
    "Provide mentorship and career guidance for current students",
    "Create a worldwide network for professional growth",
    "Support university development through fundraising",
    "Celebrate alumni achievements and success stories"
  ];

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
            <h1>About Us</h1>
          
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
                <h2 className="section-title">University History in Brief</h2>
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
      <section 
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
      </section>

      {/* Messages Section */}
      <section 
        ref={sectionRefs.messages} 
        className={`messages-section ${visibleSections.messages ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Leadership Messages</h2>
          <div className="messages-content">
            <div className="message-tabs">
              <button 
                className={`tab-button ${activeMessage === 'chancellor' ? 'active' : ''}`}
                onClick={() => setActiveMessage('chancellor')}
              >
                Chancellor
              </button>
              <button 
                className={`tab-button ${activeMessage === 'viceChancellor' ? 'active' : ''}`}
                onClick={() => setActiveMessage('viceChancellor')}
              >
                Vice-Chancellor
              </button>
              <button 
                className={`tab-button ${activeMessage === 'president' ? 'active' : ''}`}
                onClick={() => setActiveMessage('president')}
              >
                Alumni President
              </button>
            </div>
            
            <div className="message-display">
              <div className="message-card fade-in-item">
                <h3>{messages[activeMessage].title}</h3>
                <h4>{messages[activeMessage].name}</h4>
                <p>{messages[activeMessage].content}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={sectionRefs.cta} 
        className={`cta-section ${visibleSections.cta ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="cta-content">
            <h2 className="slide-up-item">Join Our Alumni Community</h2>
            <p className="slide-up-item">Be part of our growing network and stay connected with your alma mater</p>
            <div className="cta-buttons">
              <button className="btn-primary pulse-item">Register Now</button>
              <button className="btn-secondary pulse-item">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;