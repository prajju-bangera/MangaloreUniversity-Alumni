// AlumniNetwork.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlumniNetwork.css';

// Sample data - replace with actual API calls
const sampleAlumni = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    batch: '1995',
    department: 'Computer Science',
    location: 'Bangalore, India',
    currentRole: 'CTO at TechCorp',
    skills: ['AI/ML', 'Leadership', 'Startups'],
    chapter: 'Bangalore',
    isMentor: true,
    expertise: 'Technology & Entrepreneurship',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 2,
    name: 'Prof. Anjali Sharma',
    batch: '1988',
    department: 'Physics',
    location: 'Boston, USA',
    currentRole: 'Professor at MIT',
    skills: ['Research', 'Quantum Physics', 'Mentoring'],
    chapter: 'Abroad',
    isMentor: true,
    expertise: 'Academic Research & Career Guidance',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 3,
    name: 'Mr. Vikram Patel',
    batch: '2005',
    department: 'Business Administration',
    location: 'Mumbai, India',
    currentRole: 'CEO at GreenEnergy Solutions',
    skills: ['Business Strategy', 'Sustainability', 'Funding'],
    chapter: 'Mumbai',
    isMentor: false,
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 4,
    name: 'Dr. Priya Nair',
    batch: '1998',
    department: 'Medicine',
    location: 'Delhi, India',
    currentRole: 'Director at National Health Institute',
    skills: ['Healthcare', 'Research', 'Public Policy'],
    chapter: 'Mangalore',
    isMentor: true,
    expertise: 'Healthcare & Medical Research',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 5,
    name: 'Ms. Meera Krishnan',
    batch: '2010',
    department: 'Fine Arts',
    location: 'London, UK',
    currentRole: 'International Artist',
    skills: ['Contemporary Art', 'Exhibition', 'Creative Direction'],
    chapter: 'Abroad',
    isMentor: false,
    image: '/api/placeholder/300/300',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 6,
    name: 'Dr. Arjun Menon',
    batch: '2000',
    department: 'Chemistry',
    location: 'Bangalore, India',
    currentRole: 'Research Director at Global Pharma',
    skills: ['Drug Discovery', 'R&D', 'Team Leadership'],
    chapter: 'Bangalore',
    isMentor: true,
    expertise: 'Pharmaceutical Research & Development',
    image: '/api/placeholder/300/300',
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
  const [filters, setFilters] = useState({
    search: '',
    batch: 'all',
    department: 'all',
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

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Business Administration', label: 'Business Administration' },
    { value: 'Medicine', label: 'Medicine' },
    { value: 'Fine Arts', label: 'Fine Arts' },
    { value: 'Chemistry', label: 'Chemistry' }
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
        alum.department.toLowerCase().includes(searchTerm) ||
        alum.currentRole.toLowerCase().includes(searchTerm) ||
        alum.location.toLowerCase().includes(searchTerm)
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

    // Department filter
    if (filters.department !== 'all') {
      filtered = filtered.filter(alum => alum.department === filters.department);
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

  const handleConnect = (alumniId) => {
    // In real app, this would open a connection request modal
    console.log('Connect with alumni:', alumniId);
    alert('Connection request feature coming soon!');
  };

  const handleRequestMentorship = (mentorId) => {
    // In real app, this would open a mentorship request form
    console.log('Request mentorship:', mentorId);
    alert('Mentorship request feature coming soon!');
  };

  const handleJoinChapter = (chapterId) => {
    // In real app, this would open a chapter joining form
    console.log('Join chapter:', chapterId);
    alert('Chapter joining feature coming soon!');
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
                placeholder="Search alumni by name, role, or location..."
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
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
            >
              {departmentOptions.map(option => (
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
                    <div className="an-profile-meta">
                      Batch {alum.batch} • {alum.department}
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
                  <p className="an-profile-role">{alum.currentRole}</p>
                  <div className="an-profile-skills">
                    {alum.skills.map((skill, idx) => (
                      <span key={idx} className="an-skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="an-card-footer">
                  <button 
                    className="an-connect-btn"
                    onClick={() => handleConnect(alum.id)}
                  >
                    Connect
                  </button>
                  <div className="an-social-links">
                    <a href={alum.linkedin} className="an-social-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
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
        <div className="an-search-filters">
          <select 
            className="an-filter-select"
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
          >
            {departmentOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="an-mentors-grid">
        {mentors.map((mentor, index) => (
          <div 
            key={mentor.id} 
            className="an-mentor-card"
            style={{ animationDelay: `${index * 0.1}s` }}
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
              <div className="an-mentor-role">
                {mentor.currentRole}
              </div>
              <p className="an-mentor-expertise">
                <strong>Expertise:</strong> {mentor.expertise}
              </p>
              <button 
                className="an-mentor-btn"
                onClick={() => handleRequestMentorship(mentor.id)}
              >
                Request Mentorship
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
    </div>
  );
};

export default AlumniNetwork;