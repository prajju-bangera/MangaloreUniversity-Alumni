// AlumniNetwork.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlumniNetwork.css';

// Sample data - replace with actual API calls
const sampleAlumni = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    usn: '4MU95CS001',
    batch: '1995',
    location: 'Bangalore, India',
    skills: ['AI/ML', 'Leadership', 'Startups'],
    chapter: 'Bangalore',
    isMentor: true,
    expertise: 'Technology & Entrepreneurship',
    email: 'rajesh.kumar@email.com',
    phone: '9876543210',
    phoneVisibility: 'public',
    address: '123 Tech Park, Koramangala, Bangalore - 560034, Karnataka, India',
    degree: 'B.E. Computer Science',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 2,
    name: 'Prof. Anjali Sharma',
    usn: '4MU88PH002',
    batch: '1988',
    location: 'Boston, USA',
    skills: ['Research', 'Quantum Physics', 'Mentoring'],
    chapter: 'Abroad',
    isMentor: true,
    expertise: 'Academic Research & Career Guidance',
    email: 'anjali.sharma@mit.edu',
    phone: '9123456789',
    phoneVisibility: 'private',
    address: '456 University Avenue, Boston, Massachusetts 02139, United States of America',
    degree: 'M.Sc. Physics',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 3,
    name: 'Mr. Vikram Patel',
    usn: '4MU05BA003',
    batch: '2005',
    location: 'Mumbai, India',
    skills: ['Business Strategy', 'Sustainability', 'Funding'],
    chapter: 'Mumbai',
    isMentor: false,
    email: 'vikram.patel@greenenergy.com',
    phone: '9988776655',
    phoneVisibility: 'public',
    address: '789 Business Tower, Bandra Kurla Complex, Mumbai - 400051, Maharashtra, India',
    degree: 'MBA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 4,
    name: 'Dr. Priya Nair',
    usn: '4MU98MD004',
    batch: '1998',
    location: 'Delhi, India',
    skills: ['Healthcare', 'Research', 'Public Policy'],
    chapter: 'Mangalore',
    isMentor: true,
    expertise: 'Healthcare & Medical Research',
    email: 'priya.nair@nhi.gov.in',
    phone: '9876512345',
    phoneVisibility: 'private',
    address: '321 Medical Complex, Saket, New Delhi - 110017, India',
    degree: 'MBBS, MD',
    image: 'https://images.unsplash.com/photo-1551836026-d5c88ac5d69a?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 5,
    name: 'Ms. Meera Krishnan',
    usn: '4MU10FA005',
    batch: '2010',
    location: 'London, UK',
    skills: ['Contemporary Art', 'Exhibition', 'Creative Direction'],
    chapter: 'Abroad',
    isMentor: false,
    email: 'meera.krishnan@artist.com',
    phone: '9123487654',
    phoneVisibility: 'public',
    address: '567 Art Studio, Kensington, London SW7 2AZ, United Kingdom',
    degree: 'BFA Fine Arts',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 6,
    name: 'Dr. Arjun Menon',
    usn: '4MU00CH006',
    batch: '2000',
    location: 'Bangalore, India',
    skills: ['Drug Discovery', 'R&D', 'Team Leadership'],
    chapter: 'Bangalore',
    isMentor: true,
    expertise: 'Pharmaceutical Research & Development',
    email: 'arjun.menon@globalpharma.com',
    phone: '9876598765',
    phoneVisibility: 'private',
    address: '654 Research Park, Whitefield, Bangalore - 560066, Karnataka, India',
    degree: 'M.Sc. Chemistry, PhD',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#'
  }
];

const regionalChapters = [
  {
    id: 1,
    name: 'Bangalore Chapter',
    location: 'Bangalore, India',
    members: 1250,
    icon: '🏙️',
    description: 'Largest alumni community with active networking events'
  },
  {
    id: 2,
    name: 'Mangalore Chapter',
    location: 'Mangalore, India',
    members: 850,
    icon: '🌴',
    description: 'Home chapter with strong local connections'
  },
  {
    id: 3,
    name: 'Mumbai Chapter',
    location: 'Mumbai, India',
    members: 920,
    icon: '🌊',
    description: 'Thriving business and corporate network'
  },
  {
    id: 4,
    name: 'International Chapter',
    location: 'Global Network',
    members: 2100,
    icon: '✈️',
    description: 'Connecting alumni across 45+ countries'
  }
];

const locationStats = [
  { location: 'Bangalore', count: 1250 },
  { location: 'Mangalore', count: 850 },
  { location: 'Mumbai', count: 920 },
  { location: 'Delhi', count: 680 },
  { location: 'International', count: 2100 }
];

const AlumniNetwork = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('directory');
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectedUsers, setConnectedUsers] = useState(new Set());
  const [expandedAddresses, setExpandedAddresses] = useState(new Set());
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    batch: 'all',
    chapter: 'all',
    isMentor: 'all'
  });

  // Filter options
  const batchOptions = [
    { value: 'all', label: 'All Batches' },
    { value: '1980-1990', label: '1980-1990' },
    { value: '1991-2000', label: '1991-2000' },
    { value: '2001-2010', label: '2001-2010' },
    { value: '2011-2020', label: '2011-2020' }
  ];

  const chapterOptions = [
    { value: 'all', label: 'All Chapters' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Mangalore', label: 'Mangalore' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Abroad', label: 'International' }
  ];

  const mentorOptions = [
    { value: 'all', label: 'All Alumni' },
    { value: 'mentors', label: 'Mentors Only' },
    { value: 'non-mentors', label: 'Other Alumni' }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAlumni(sampleAlumni);
        setFilteredAlumni(sampleAlumni);
        setMentors(sampleAlumni.filter(alum => alum.isMentor));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterAlumni();
  }, [filters, alumni]);

  const filterAlumni = () => {
    let filtered = [...alumni];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(alum =>
        alum.name.toLowerCase().includes(searchTerm) ||
        alum.location.toLowerCase().includes(searchTerm) ||
        alum.usn.toLowerCase().includes(searchTerm) ||
        alum.degree.toLowerCase().includes(searchTerm)
      );
    }

    // Batch filter
    if (filters.batch !== 'all') {
      filtered = filtered.filter(alum => {
        const batchYear = parseInt(alum.batch);
        const [start, end] = filters.batch.split('-').map(Number);
        return batchYear >= start && batchYear <= end;
      });
    }

    // Chapter filter
    if (filters.chapter !== 'all') {
      filtered = filtered.filter(alum => alum.chapter === filters.chapter);
    }

    // Mentor filter
    if (filters.isMentor === 'mentors') {
      filtered = filtered.filter(alum => alum.isMentor);
    } else if (filters.isMentor === 'non-mentors') {
      filtered = filtered.filter(alum => !alum.isMentor);
    }

    setFilteredAlumni(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleConnect = (alumniId, event = null) => {
    if (event) {
      event.stopPropagation();
    }
    
    // Add to connected users set
    setConnectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(alumniId)) {
        newSet.delete(alumniId);
        alert('Connection removed successfully!');
      } else {
        newSet.add(alumniId);
        alert('Connection request sent successfully!');
      }
      return newSet;
    });
  };

  const handleRequestMentorship = (mentorId, event = null) => {
    if (event) {
      event.stopPropagation();
    }
    // In real app, this would open a mentorship request form
    console.log('Request mentorship:', mentorId);
    alert('Mentorship request feature coming soon!');
  };

  const handleJoinChapter = (chapterId) => {
    // In real app, this would open a chapter joining form
    console.log('Join chapter:', chapterId);
    alert('Chapter joining feature coming soon!');
  };

  // Format phone number based on visibility
  const formatPhoneNumber = (phone, visibility) => {
    if (visibility === 'private') {
      return '******' + phone.slice(-4);
    }
    return phone;
  };

  // Toggle address expansion
  const toggleAddress = (alumniId, event = null) => {
    if (event) {
      event.stopPropagation();
    }
    
    setExpandedAddresses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(alumniId)) {
        newSet.delete(alumniId);
      } else {
        newSet.add(alumniId);
      }
      return newSet;
    });
  };

  // Format address with line breaks and view more functionality
  const formatAddress = (address, alumniId) => {
    const isExpanded = expandedAddresses.has(alumniId);
    const addressLines = address.split(', ');
    
    if (addressLines.length <= 2 || isExpanded) {
      return address;
    }
    
    return addressLines.slice(0, 2).join(', ');
  };

  // Handle card click to show popup
  const handleCardClick = (alum) => {
    setSelectedAlumni(alum);
    setShowPopup(true);
  };

  // Handle popup close
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedAlumni(null);
  };

  // Prevent popup close when clicking inside popup content
  const handlePopupClick = (event) => {
    event.stopPropagation();
  };

  const tabs = [
    { id: 'directory', name: 'Alumni Directory', badge: alumni.length },
    { id: 'map', name: 'Alumni Map' },
    { id: 'chapters', name: 'Regional Chapters', badge: regionalChapters.length },
    { id: 'mentors', name: 'Alumni Mentors', badge: mentors.length }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'directory':
        return renderDirectory();
      case 'map':
        return renderMap();
      case 'chapters':
        return renderChapters();
      case 'mentors':
        return renderMentors();
      default:
        return renderDirectory();
    }
  };

  const renderDirectory = () => {
    if (loading) {
      return (
        <div className="an-loading">
          <div className="an-loading-spinner"></div>
        </div>
      );
    }

    return (
      <div className="an-directory-section">
        <div className="an-section-header">
          <h2 className="an-section-title">Alumni Directory</h2>
          <div className="an-search-filters">
            <div className="an-search-box">
              <input
                type="text"
                className="an-search-input"
                placeholder="Search alumni by name, USN, degree, or location..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <div className="an-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>

            <select 
              className="an-filter-select"
              value={filters.batch}
              onChange={(e) => handleFilterChange('batch', e.target.value)}
            >
              {batchOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select 
              className="an-filter-select"
              value={filters.chapter}
              onChange={(e) => handleFilterChange('chapter', e.target.value)}
            >
              {chapterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredAlumni.length > 0 ? (
          <div className="an-alumni-grid">
            {filteredAlumni.map((alum, index) => (
              <div 
                key={alum.id} 
                className="an-alumni-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCardClick(alum)}
              >
                <div className="an-card-header">
                  <img 
                    src={alum.image} 
                    alt={alum.name}
                    className="an-profile-image"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alum.name)}&background=667eea&color=fff&size=300`;
                    }}
                  />
                  <div className="an-profile-info">
                    <h3 className="an-profile-name">{alum.name}</h3>
                    {/* UPDATED: USN below Batch */}
                    <div className="an-profile-meta">
                      <div className="an-profile-batch">Batch {alum.batch}</div>
                      <div className="an-profile-usn">USN: {alum.usn}</div>
                    </div>
                    <div className="an-profile-degree">
                      {alum.degree}
                    </div>
                    <div className="an-profile-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                      </svg>
                      {alum.location}
                    </div>
                  </div>
                </div>

                <div className="an-card-body">
                  {/* Skills Section - Always visible */}
                 
                  
                  {/* Contact Information - Hidden on mobile, shown in popup */}
                  <div className="an-contact-info">
                    <div className="an-contact-item">
                      <span className="an-contact-label">Email:</span>
                      <span className="an-contact-value">{alum.email}</span>
                    </div>
                    <div className="an-contact-item">
                      <span className="an-contact-label">Phone:</span>
                      <span className="an-contact-value">
                        {formatPhoneNumber(alum.phone, alum.phoneVisibility)}
                        {alum.phoneVisibility === 'private' && (
                          <span className="an-private-badge">Private</span>
                        )}
                      </span>
                    </div>
                    <div className="an-contact-item an-address-item">
                      <span className="an-contact-label">Address:</span>
                      <div className="an-address-content">
                        <span className="an-contact-value an-address">
                          {formatAddress(alum.address, alum.id)}
                        </span>
                        {/* UPDATED: View More button on second line */}
                        {alum.address.split(', ').length > 2 && (
                          <button 
                            className="an-view-more-btn"
                            onClick={(e) => toggleAddress(alum.id, e)}
                          >
                            {expandedAddresses.has(alum.id) ? 'View Less' : 'View More'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="an-card-footer">
                  <button 
                    className={`an-connect-btn ${connectedUsers.has(alum.id) ? 'connected' : ''}`}
                    onClick={(e) => handleConnect(alum.id, e)}
                  >
                    {connectedUsers.has(alum.id) ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Connected
                      </>
                    ) : (
                      'Connect'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="an-no-results">
            <div className="an-no-results-icon">🔍</div>
            <h3 className="an-no-results-text">No alumni found</h3>
            <p className="an-no-results-subtext">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderMap = () => (
    <div className="an-map-section">
      <div className="an-section-header">
        <h2 className="an-section-title">Alumni Map by Location</h2>
      </div>
      
      <div className="an-map-container">
        <div className="an-map-placeholder">
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
            <p>Interactive Alumni Map Coming Soon</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Visualize alumni distribution worldwide</p>
          </div>
        </div>
      </div>

      <div className="an-location-stats">
        {locationStats.map((stat, index) => (
          <div key={index} className="an-location-stat">
            <div className="an-stat-number">{stat.count.toLocaleString()}+</div>
            <div className="an-stat-label">Alumni in {stat.location}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChapters = () => (
    <div className="an-chapters-section">
      <div className="an-section-header">
        <h2 className="an-section-title">Regional Chapters</h2>
      </div>
      
      <div className="an-chapters-grid">
        {regionalChapters.map((chapter, index) => (
          <div 
            key={chapter.id} 
            className="an-chapter-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="an-chapter-icon">{chapter.icon}</div>
            <h3 className="an-chapter-name">{chapter.name}</h3>
            <div className="an-chapter-members">
              {chapter.members.toLocaleString()} Members
            </div>
            <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {chapter.description}
            </p>
            <button 
              className="an-chapter-btn"
              onClick={() => handleJoinChapter(chapter.id)}
            >
              Join Chapter
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentors = () => (
    <div className="an-mentors-section">
      <div className="an-section-header">
        <h2 className="an-section-title">Alumni Mentors Directory</h2>
      </div>
      
      <div className="an-mentors-grid">
        {mentors.map((mentor, index) => (
          <div 
            key={mentor.id} 
            className="an-mentor-card"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleCardClick(mentor)}
          >
            <div className="an-mentor-content">
              <img 
                src={mentor.image} 
                alt={mentor.name}
                className="an-mentor-image"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=667eea&color=fff&size=300`;
                }}
              />
              <h3 className="an-mentor-name">{mentor.name}</h3>
              {/* UPDATED: USN below Batch for mentors too */}
              <div className="an-profile-meta">
                <div className="an-profile-batch">Batch {mentor.batch}</div>
                <div className="an-profile-usn">USN: {mentor.usn}</div>
              </div>
              <div className="an-mentor-degree">
                {mentor.degree}
              </div>
              
              {/* Mentor Contact Info - Hidden on mobile */}
              <div className="an-mentor-contact">
                <div className="an-contact-item">
                  <span>Email: {mentor.email}</span>
                </div>
                <div className="an-contact-item">
                  <span>Phone: {formatPhoneNumber(mentor.phone, mentor.phoneVisibility)}</span>
                  {mentor.phoneVisibility === 'private' && (
                    <span className="an-private-badge">Private</span>
                  )}
                </div>
              </div>
              
              <button 
                className="an-mentor-btn"
                onClick={(e) => handleRequestMentorship(mentor.id, e)}
              >
                Request Mentorship
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Popup
  const renderPopup = () => {
    if (!showPopup || !selectedAlumni) return null;

    return (
      <div className="an-popup-overlay" onClick={handleClosePopup}>
        <div className="an-popup-content" onClick={handlePopupClick}>
          <button className="an-popup-close" onClick={handleClosePopup}>
            ×
          </button>
          
          <div className="an-popup-header">
            <img 
              src={selectedAlumni.image} 
              alt={selectedAlumni.name}
              className="an-popup-image"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedAlumni.name)}&background=667eea&color=fff&size=300`;
              }}
            />
            <div className="an-popup-info">
              <h3 className="an-popup-name">{selectedAlumni.name}</h3>
              {/* UPDATED: USN below Batch in popup */}
              <div className="an-popup-meta">
                <div className="an-popup-batch">Batch {selectedAlumni.batch}</div>
                <div className="an-popup-usn">USN: {selectedAlumni.usn}</div>
              </div>
              <div className="an-popup-degree">
                {selectedAlumni.degree}
              </div>
              <div className="an-popup-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
                {selectedAlumni.location}
              </div>
            </div>
          </div>

          {/* Contact Information - Always visible in popup */}
          <div className="an-popup-contact">
            <div className="an-popup-contact-item">
              <span className="an-popup-contact-label">Email:</span>
              <span className="an-popup-contact-value">{selectedAlumni.email}</span>
            </div>
            <div className="an-popup-contact-item">
              <span className="an-popup-contact-label">Phone:</span>
              <span className="an-popup-contact-value">
                {formatPhoneNumber(selectedAlumni.phone, selectedAlumni.phoneVisibility)}
                {selectedAlumni.phoneVisibility === 'private' && (
                  <span className="an-private-badge">Private</span>
                )}
              </span>
            </div>
            <div className="an-popup-contact-item">
              <span className="an-popup-contact-label">Address:</span>
              <span className="an-popup-contact-value">{selectedAlumni.address}</span>
            </div>
            {/* {selectedAlumni.isMentor && (
              <div className="an-popup-contact-item">
                <span className="an-popup-contact-label">Expertise:</span>
                <span className="an-popup-contact-value">{selectedAlumni.expertise}</span>
              </div>
            )} */}
          </div>

          {/* Skills Section */}
          {selectedAlumni.skills && selectedAlumni.skills.length > 0 && (
            <div className="an-popup-skills">
              {/* <h4 className="an-popup-skills-title">Skills & Expertise</h4> */}
              {/* <div className="an-popup-skills-list">
                {selectedAlumni.skills.map((skill, idx) => (
                  <span key={idx} className="an-popup-skill">
                    {skill}
                  </span>
                ))}
              </div> */}
            </div>
          )}

          <div className="an-popup-footer">
            <button 
              className={`an-popup-connect-btn ${connectedUsers.has(selectedAlumni.id) ? 'connected' : ''}`}
              onClick={(e) => handleConnect(selectedAlumni.id, e)}
            >
              {connectedUsers.has(selectedAlumni.id) ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Connected
                </>
              ) : (
                'Connect'
              )}
            </button>
            
            {selectedAlumni.isMentor && (
              <button 
                className="an-popup-connect-btn"
                onClick={(e) => handleRequestMentorship(selectedAlumni.id, e)}
                style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}
              >
                Request Mentorship
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="an-page">
      {/* Hero Section */}
      <section className="an-hero">
        <div className="an-hero-content">
          <h1 className="an-hero-title">Alumni Network</h1>
          <p className="an-hero-subtitle">
            Connect with fellow Mangalore University alumni worldwide. 
            Explore opportunities, find mentors, and join regional chapters to strengthen our community.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="an-tabs-section">
        <div className="an-tabs-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`an-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
              {tab.badge && <span className="an-tab-badge">{tab.badge}</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="an-main-content">
        {renderTabContent()}
      </main>

      {/* Popup Modal */}
      {renderPopup()}
    </div>
  );
};

export default AlumniNetwork;