// pages/AlumniObjectives.js
import React, { useState, useEffect, useRef } from 'react';
import './AlumniObjectives.css';

const AlumniObjectives = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = {
    hero: useRef(null),
    objectives: useRef(null),
    impact: useRef(null),
    values: useRef(null)
  };

  // Main Objectives Data
  const mainObjectives = [
    {
      id: 1,
      title: "Strengthen Alumni Network",
      icon: "🌐",
      description: "Build and maintain a strong, connected community of Mangalore University alumni worldwide",
      features: [
        "Global alumni directory and networking platform",
        "Regional chapters and local meetups",
        "Online community engagement",
        "Professional networking opportunities"
      ],
      color: "#1a56db"
    },
    {
      id: 2,
      title: "Student Support & Mentorship",
      icon: "🎓",
      description: "Provide guidance, mentorship, and career support to current students",
      features: [
        "Career counseling and guidance sessions",
        "Industry mentorship programs",
        "Internship and job placement assistance",
        "Skill development workshops"
      ],
      color: "#7e22ce"
    },
    {
      id: 3,
      title: "University Development",
      icon: "🏛️",
      description: "Support the growth and development of Mangalore University",
      features: [
        "Scholarship and endowment funds",
        "Infrastructure development support",
        "Research and academic collaborations",
        "Faculty development programs"
      ],
      color: "#059669"
    },
    {
      id: 4,
      title: "Community Engagement",
      icon: "🤝",
      description: "Foster social responsibility and community service among alumni",
      features: [
        "Social outreach programs",
        "Community development initiatives",
        "Environmental sustainability projects",
        "Educational outreach activities"
      ],
      color: "#dc2626"
    }
  ];

  // Impact Statistics
  const impactStats = [
    {
      number: "10,000+",
      label: "Alumni Connected",
      icon: "👥",
      description: "Active alumni members in our global network"
    },
    {
      number: "500+",
      label: "Students Mentored",
      icon: "🌟",
      description: "Current students receiving guidance and support"
    },
    {
      number: "50+",
      label: "Countries Reached",
      icon: "🌍",
      description: "Global presence of our alumni community"
    },
    {
      number: "100+",
      label: "Events Organized",
      icon: "🎪",
      description: "Successful networking and community events"
    }
  ];

  // Core Values
  const coreValues = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in all our endeavors and promoting academic and professional excellence",
      icon: "⭐",
      color: "#f59e0b"
    },
    {
      title: "Collaboration",
      description: "Fostering partnerships between alumni, students, faculty, and the university community",
      icon: "🤝",
      color: "#3b82f6"
    },
    {
      title: "Innovation",
      description: "Encouraging creative thinking and embracing new ideas for continuous improvement",
      icon: "💡",
      color: "#8b5cf6"
    },
    {
      title: "Integrity",
      description: "Maintaining the highest ethical standards and transparency in all our activities",
      icon: "🛡️",
      color: "#10b981"
    },
    {
      title: "Inclusivity",
      description: "Creating an inclusive environment that values diversity and equal opportunities",
      icon: "🌈",
      color: "#ec4899"
    },
    {
      title: "Service",
      description: "Dedicated to serving our alumni community, students, and society at large",
      icon: "❤️",
      color: "#ef4444"
    }
  ];

  // Strategic Goals
  const strategicGoals = [
    {
      period: "2024-2026",
      goals: [
        "Increase alumni engagement by 40% through digital platforms",
        "Establish 5 new international alumni chapters",
        "Launch comprehensive mentorship program for 1000+ students",
        "Raise ₹50 lakh for student scholarship funds"
      ]
    },
    {
      period: "2027-2029",
      goals: [
        "Achieve 15,000+ registered alumni members",
        "Implement AI-powered career matching platform",
        "Establish alumni-funded research centers",
        "Create sustainable community outreach programs"
      ]
    }
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
    <div className="alumni-objectives">
      {/* Half-Screen Hero Section */}
      <section 
        ref={sectionRefs.hero} 
        className={`objectives-hero ${visibleSections.hero ? 'visible' : ''}`}
      >
        {/* Background Image with Overlay */}
        <div className="hero-background">
          <div className="hero-image"></div>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="objectives-hero-content">
          <div className="title-container">
            <h1 className="main-title">
              Alumni Association Objectives
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
          <p className="hero-subtitle">
            Our mission is to foster lifelong connections, support student success, 
            and contribute to the continued excellence of Mangalore University
          </p>
        </div>
      </section>

      {/* Main Objectives Section */}
      <section 
        ref={sectionRefs.objectives} 
        className={`objectives-section ${visibleSections.objectives ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Our Key Objectives</h2>
          <p className="section-subtitle">
            Driving meaningful impact through focused initiatives and collaborative efforts
          </p>

          <div className="objectives-grid">
            {mainObjectives.map((objective, index) => (
              <div 
                key={objective.id}
                className={`objective-card slide-up-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="objective-header"
                  style={{ backgroundColor: objective.color }}
                >
                  <div className="objective-icon">{objective.icon}</div>
                  <h3>{objective.title}</h3>
                </div>
                
                <div className="objective-content">
                  <p className="objective-description">{objective.description}</p>
                  
                  <div className="features-list">
                    <h4>Key Initiatives:</h4>
                    <ul>
                      {objective.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="objective-footer">
                  <div 
                    className="progress-indicator"
                    style={{ backgroundColor: `${objective.color}20` }}
                  >
                    <div 
                      className="progress-bar"
                      style={{ 
                        backgroundColor: objective.color,
                        width: `${Math.random() * 30 + 70}%`
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">Active Initiative</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section 
        ref={sectionRefs.impact} 
        className={`impact-section ${visibleSections.impact ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-subtitle">
            Measuring success through meaningful metrics and community engagement
          </p>

          <div className="impact-grid">
            {impactStats.map((stat, index) => (
              <div 
                key={index}
                className={`impact-card scale-in-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="impact-icon">{stat.icon}</div>
                <div className="impact-content">
                  <h3 className="impact-number">{stat.number}</h3>
                  <p className="impact-label">{stat.label}</p>
                  <p className="impact-description">{stat.description}</p>
                </div>
                <div className="impact-glow"></div>
              </div>
            ))}
          </div>

          {/* Strategic Goals Timeline */}
          <div className="strategic-goals">
            <h3 className="goals-title">Strategic Goals Timeline</h3>
            <div className="timeline">
              {strategicGoals.map((period, index) => (
                <div key={index} className="timeline-period">
                  <div className="period-header">
                    <div className="period-dot"></div>
                    <h4 className="period-title">{period.period}</h4>
                  </div>
                  <div className="period-goals">
                    {period.goals.map((goal, goalIndex) => (
                      <div key={goalIndex} className="goal-item">
                        <span className="goal-check">✓</span>
                        <span className="goal-text">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section 
        ref={sectionRefs.values} 
        className={`values-section ${visibleSections.values ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">
            The fundamental principles that guide our actions and decisions
          </p>

          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className={`value-card zoom-in-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="value-icon-container"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  <span 
                    className="value-icon"
                    style={{ color: value.color }}
                  >
                    {value.icon}
                  </span>
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="objectives-cta-section">
        <div className="container">
          <div className="objectives-cta-content">
            <h2>Join Us in Achieving Our Objectives</h2>
            <p>
              Become an active member of our alumni community and contribute to 
              the growth and success of Mangalore University and its students.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Get Involved</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlumniObjectives;