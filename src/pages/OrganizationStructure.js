// pages/OrganizationStructure.js
import React, { useState, useEffect, useRef } from 'react';
import './OrganizationStructure.css';

const OrganizationStructure = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = {
    hero: useRef(null),
    leadership: useRef(null),
    committees: useRef(null),
    departments: useRef(null)
  };

  // Leadership hierarchy data
  const leadershipHierarchy = [
    {
      level: "University Leadership",
      members: [
        {
          id: 1,
          name: "Dr. S. R. Niranjan",
          position: "Chancellor",
          role: "Chief Executive Officer",
          photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          description: "Overall in-charge of the university and alumni association"
        },
        {
          id: 2,
          name: "Dr. P. S. Yadapadithaya",
          position: "Vice-Chancellor",
          role: "Chief Administrative Officer",
          photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          description: "Oversees university operations and alumni relations"
        }
      ]
    },
    {
      level: "Alumni Association Leadership",
      members: [
        {
          id: 3,
          name: "Mr. Rajesh Kumar",
          position: "President",
          role: "Alumni Association Head",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          description: "Leads the alumni association and strategic initiatives"
        },
        {
          id: 4,
          name: "Ms. Priya Sharma",
          position: "Secretary",
          role: "Administrative Head",
          photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          description: "Manages daily operations and member communications"
        },
        {
          id: 5,
          name: "Mr. Anil Patel",
          position: "Treasurer",
          role: "Financial Manager",
          photo: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          description: "Handles financial matters and budget planning"
        }
      ]
    }
  ];

  // Committees data
  const committees = [
    {
      id: 1,
      name: "Executive Committee",
      chairperson: "Mr. Rajesh Kumar",
      members: 12,
      color: "#1a56db",
      icon: "👥",
      description: "Overall governance and strategic direction of the alumni association",
      responsibilities: [
        "Strategic Planning",
        "Budget Approval",
        "Policy Making",
        "Performance Review"
      ]
    },
    {
      id: 2,
      name: "Events Committee",
      chairperson: "Ms. Sunita Rao",
      members: 8,
      color: "#7e22ce",
      icon: "🎪",
      description: "Organizes alumni events, reunions, and networking sessions",
      responsibilities: [
        "Event Planning",
        "Venue Management",
        "Guest Coordination",
        "Logistics"
      ]
    },
    {
      id: 3,
      name: "Membership Committee",
      chairperson: "Dr. Arjun Mehta",
      members: 6,
      color: "#059669",
      icon: "📋",
      description: "Manages member recruitment, engagement, and database",
      responsibilities: [
        "Member Recruitment",
        "Database Management",
        "Engagement Programs",
        "Membership Drive"
      ]
    },
    {
      id: 4,
      name: "Mentorship Committee",
      chairperson: "Prof. Lakshmi Nair",
      members: 10,
      color: "#dc2626",
      icon: "🤝",
      description: "Facilitates mentorship programs between alumni and students",
      responsibilities: [
        "Mentor Matching",
        "Program Development",
        "Progress Tracking",
        "Workshop Organization"
      ]
    },
    {
      id: 5,
      name: "Fundraising Committee",
      chairperson: "Mr. Vikram Singh",
      members: 7,
      color: "#ea580c",
      icon: "💰",
      description: "Coordinates fundraising activities and donor relations",
      responsibilities: [
        "Fundraising Campaigns",
        "Donor Relations",
        "Grant Applications",
        "Financial Planning"
      ]
    },
    {
      id: 6,
      name: "Communication Committee",
      chairperson: "Ms. Neha Gupta",
      members: 5,
      color: "#9333ea",
      icon: "📢",
      description: "Manages internal and external communications",
      responsibilities: [
        "Newsletter Publication",
        "Social Media Management",
        "Press Releases",
        "Website Updates"
      ]
    }
  ];

  // Departments data
  const departments = [
    {
      id: 1,
      name: "Alumni Relations",
      head: "Ms. Anjali Desai",
      staff: 4,
      icon: "💼",
      gradient: "linear-gradient(135deg, #1a56db, #7e22ce)",
      functions: ["Member Engagement", "Event Coordination", "Database Management"]
    },
    {
      id: 2,
      name: "Career Services",
      head: "Mr. Sameer Joshi",
      staff: 3,
      icon: "🎯",
      gradient: "linear-gradient(135deg, #059669, #0d9488)",
      functions: ["Job Placement", "Career Counseling", "Industry Partnerships"]
    },
    {
      id: 3,
      name: "Student Outreach",
      head: "Dr. Meera Krishnan",
      staff: 5,
      icon: "🎓",
      gradient: "linear-gradient(135deg, #dc2626, #ea580c)",
      functions: ["Campus Programs", "Student Mentoring", "Scholarship Management"]
    },
    {
      id: 4,
      name: "Digital Platform",
      head: "Mr. Rohan Malhotra",
      staff: 6,
      icon: "🌐",
      gradient: "linear-gradient(135deg, #9333ea, #c026d3)",
      functions: ["Website Management", "App Development", "Tech Support"]
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
    <div className="organization-structure">
      {/* Half-Screen Hero Section with Background Image */}
      <section 
        ref={sectionRefs.hero} 
        className={`org-hero ${visibleSections.hero ? 'visible' : ''}`}
      >
        {/* Background Image with Overlay */}
        <div className="hero-background">
          <div className="hero-image"></div>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="org-hero-content">
          <div className="title-container">
            <h1 className="main-title">
              Organization Structure
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
            Discover the framework that drives our alumni community forward. 
            Meet the leaders, committees, and departments working together to strengthen 
            the Mangalore University alumni network.
          </p>
        </div>
      </section>

      {/* Leadership Hierarchy Section */}
      <section 
        ref={sectionRefs.leadership} 
        className={`leadership-section ${visibleSections.leadership ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Leadership Hierarchy</h2>
          <p className="section-subtitle">
            Our dedicated leadership team guides the alumni association with vision and commitment
          </p>

          <div className="hierarchy-container">
            {leadershipHierarchy.map((level, levelIndex) => (
              <div key={levelIndex} className="hierarchy-level">
                <div className="level-header">
                  <h3>{level.level}</h3>
                  <div className="level-line"></div>
                </div>
                <div className="level-members">
                  {level.members.map((member, memberIndex) => (
                    <div 
                      key={member.id}
                      className={`leader-card slide-up-item`}
                      style={{ animationDelay: `${memberIndex * 0.1}s` }}
                    >
                      <div className="leader-photo-container">
                        <img 
                          src={member.photo} 
                          alt={member.name}
                          className="leader-photo"
                        />
                        <div className="photo-overlay"></div>
                      </div>
                      <div className="leader-info">
                        <h4 className="leader-name">{member.name}</h4>
                        <p className="leader-position">{member.position}</p>
                        <p className="leader-role">{member.role}</p>
                        <p className="leader-description">{member.description}</p>
                      </div>
                      <div className="leader-badge">
                        <span className="badge-icon">⭐</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees Section */}
      <section 
        ref={sectionRefs.committees} 
        className={`committees-section ${visibleSections.committees ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Working Committees</h2>
          <p className="section-subtitle">
            Specialized committees driving various aspects of our alumni community
          </p>

          <div className="committees-grid">
            {committees.map((committee, index) => (
              <div 
                key={committee.id}
                className={`committee-card scale-in-item`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  borderLeftColor: committee.color
                }}
              >
                <div className="committee-header">
                  <div 
                    className="committee-icon"
                    style={{ backgroundColor: committee.color }}
                  >
                    <span>{committee.icon}</span>
                  </div>
                  <div className="committee-info">
                    <h3>{committee.name}</h3>
                    <p className="committee-chair">Chair: {committee.chairperson}</p>
                    <div className="committee-meta">
                      <span className="member-count">{committee.members} members</span>
                    </div>
                  </div>
                </div>
                
                <p className="committee-description">{committee.description}</p>
                
                <div className="responsibilities">
                  <h4>Key Responsibilities:</h4>
                  <div className="responsibility-tags">
                    {committee.responsibilities.map((resp, respIndex) => (
                      <span 
                        key={respIndex}
                        className="responsibility-tag"
                        style={{ backgroundColor: `${committee.color}20`, color: committee.color }}
                      >
                        {resp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section 
        ref={sectionRefs.departments} 
        className={`departments-section ${visibleSections.departments ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Functional Departments</h2>
          <p className="section-subtitle">
            Our specialized departments ensure smooth operations and member satisfaction
          </p>

          <div className="departments-container">
            {departments.map((dept, index) => (
              <div 
                key={dept.id}
                className={`department-card zoom-in-item`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div 
                  className="department-header"
                  style={{ background: dept.gradient }}
                >
                  <div className="dept-icon">{dept.icon}</div>
                  <h3>{dept.name}</h3>
                </div>
                
                <div className="department-content">
                  <div className="dept-meta">
                    <div className="meta-item">
                      <span className="meta-label">Head</span>
                      <span className="meta-value">{dept.head}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Staff</span>
                      <span className="meta-value">{dept.staff} members</span>
                    </div>
                  </div>
                  
                  <div className="dept-functions">
                    <h4>Key Functions:</h4>
                    <ul className="functions-list">
                      {dept.functions.map((func, funcIndex) => (
                        <li key={funcIndex}>{func}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="department-footer">
                  <button className="dept-contact-btn">
                    Contact Department
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="org-cta-section">
        <div className="container">
          <div className="org-cta-content">
            <h2>Join Our Organizational Framework</h2>
            <p>
              Interested in contributing to our alumni community? Explore opportunities 
              to join committees, volunteer, or take on leadership roles.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Volunteer Now</button>
              <button className="btn-secondary">Contact Leadership</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrganizationStructure;