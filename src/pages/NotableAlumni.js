// NotableAlumni.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotableAlumni.css';

// Sample alumni data - replace with actual data from your backend
const sampleAlumni = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    batch: '1995',
    department: 'Computer Science',
    currentRole: 'Chief Technology Officer at TechCorp',
    bio: 'Leading innovation in artificial intelligence and machine learning. Published over 50 research papers and holds 15 patents in computer vision.',
    field: 'business',
    image: '/api/placeholder/300/300',
    achievements: ['Forbes 30 Under 30', 'IEEE Fellow'],
    featured: true
  },
  {
    id: 2,
    name: 'Prof. Anjali Sharma',
    batch: '1988',
    department: 'Physics',
    currentRole: 'Professor at MIT',
    bio: 'Nobel Prize winner in Physics for groundbreaking research in quantum mechanics. Author of several influential textbooks.',
    field: 'academia',
    image: '/api/placeholder/300/300',
    achievements: ['Nobel Prize in Physics', 'Padma Shri Award'],
    featured: true
  },
  {
    id: 3,
    name: 'Mr. Vikram Patel',
    batch: '2005',
    department: 'Business Administration',
    currentRole: 'Founder & CEO of GreenEnergy Solutions',
    bio: 'Pioneering sustainable energy solutions. Successfully raised $50M in funding and expanded operations to 15 countries.',
    field: 'business',
    image: '/api/placeholder/300/300',
    achievements: ['UN Sustainable Development Award'],
    featured: false
  },
  {
    id: 4,
    name: 'Dr. Priya Nair',
    batch: '1998',
    department: 'Medicine',
    currentRole: 'Director of National Health Institute',
    bio: 'Leading researcher in infectious diseases. Played crucial role in pandemic response and vaccine development.',
    field: 'government',
    image: '/api/placeholder/300/300',
    achievements: ['National Science Award', 'WHO Recognition'],
    featured: true
  },
  {
    id: 5,
    name: 'Ms. Meera Krishnan',
    batch: '2010',
    department: 'Fine Arts',
    currentRole: 'Internationally Acclaimed Painter',
    bio: 'Known for contemporary art that explores cultural identity. Exhibited in Louvre, MoMA, and Tate Modern.',
    field: 'arts',
    image: '/api/placeholder/300/300',
    achievements: ['National Award for Visual Arts'],
    featured: false
  },
  {
    id: 6,
    name: 'Dr. Arjun Menon',
    batch: '2000',
    department: 'Chemistry',
    currentRole: 'Research Director at Global Pharma',
    bio: 'Developed life-saving drugs for rare diseases. Published in Nature and Science journals.',
    field: 'science',
    image: '/api/placeholder/300/300',
    achievements: ['Breakthrough Prize in Life Sciences'],
    featured: true
  }
];

const NotableAlumni = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    field: 'all',
    batch: 'all',
    department: 'all',
    search: ''
  });

  // Field options
  const fieldOptions = [
    { value: 'all', label: 'All Fields' },
    { value: 'academia', label: 'Academia' },
    { value: 'business', label: 'Business' },
    { value: 'government', label: 'Government' },
    { value: 'arts', label: 'Arts' },
    { value: 'science', label: 'Science' }
  ];

  // Batch options (you can generate these dynamically)
  const batchOptions = [
    { value: 'all', label: 'All Batches' },
    { value: '1980-1990', label: '1980-1990' },
    { value: '1991-2000', label: '1991-2000' },
    { value: '2001-2010', label: '2001-2010' },
    { value: '2011-2020', label: '2011-2020' }
  ];

  // Department options
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Business Administration', label: 'Business Administration' },
    { value: 'Medicine', label: 'Medicine' },
    { value: 'Fine Arts', label: 'Fine Arts' },
    { value: 'Chemistry', label: 'Chemistry' }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        // In real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAlumni(sampleAlumni);
        setFilteredAlumni(sampleAlumni);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  useEffect(() => {
    filterAlumni();
  }, [filters, alumni]);

  const filterAlumni = () => {
    let filtered = [...alumni];

    // Field filter
    if (filters.field !== 'all') {
      filtered = filtered.filter(alum => alum.field === filters.field);
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

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(alum =>
        alum.name.toLowerCase().includes(searchTerm) ||
        alum.department.toLowerCase().includes(searchTerm) ||
        alum.currentRole.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredAlumni(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleReadMore = (alumniId) => {
    navigate(`/alumni-profile/${alumniId}`);
  };

  const getFieldBadgeClass = (field) => {
    const badgeClasses = {
      academia: 'na-badge-academia',
      business: 'na-badge-business',
      government: 'na-badge-government',
      arts: 'na-badge-arts',
      science: 'na-badge-science'
    };
    return badgeClasses[field] || 'na-badge-academia';
  };

  const getFieldIcon = (field) => {
    const icons = {
      academia: '🎓',
      business: '💼',
      government: '🏛️',
      arts: '🎨',
      science: '🔬'
    };
    return icons[field] || '🎓';
  };

  const featuredAlumni = alumni.filter(alum => alum.featured);

  return (
    <div className="notable-alumni-page">
      {/* Hero Section */}
      <section className="na-hero">
        <div className="na-hero-content">
          <h1 className="na-hero-title">Notable Alumni</h1>
          <p className="na-hero-subtitle">
            Celebrating the extraordinary achievements of Mangalore University alumni 
            who are making significant contributions across various fields worldwide.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="na-filters-section">
        <div className="na-filters-container">
          <div className="na-filter-group">
            <label className="na-filter-label">Field</label>
            <select 
              className="na-filter-select"
              value={filters.field}
              onChange={(e) => handleFilterChange('field', e.target.value)}
            >
              {fieldOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="na-filter-group">
            <label className="na-filter-label">Batch</label>
            <select 
              className="na-filter-select"
              value={filters.batch}
              onChange={(e) => handleFilterChange('batch', e.target.value)}
            >
              {batchOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="na-filter-group">
            <label className="na-filter-label">Department</label>
            <select 
              className="na-filter-select"
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

          <div className="na-search-box">
            <label className="na-filter-label">Search Alumni</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="na-search-input"
                placeholder="Search by name, department, or role..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <div className="na-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Grid Section */}
      <section className="na-alumni-section">
        {loading ? (
          <div className="na-loading">
            <div className="na-loading-spinner"></div>
          </div>
        ) : filteredAlumni.length > 0 ? (
          <>
            <div className="na-alumni-grid">
              {filteredAlumni.map((alum, index) => (
                <div 
                  key={alum.id} 
                  className="na-profile-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="na-card-header">
                    <div className="na-profile-image-container">
                      <img 
                        src={alum.image} 
                        alt={alum.name}
                        className="na-profile-image"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alum.name)}&background=667eea&color=fff&size=300`;
                        }}
                      />
                      <div className={`na-profile-badge ${getFieldBadgeClass(alum.field)}`}>
                        {getFieldIcon(alum.field)}
                      </div>
                    </div>
                    <h3 className="na-profile-name">{alum.name}</h3>
                    <div className="na-profile-meta">
                      Batch {alum.batch} • {alum.department}
                    </div>
                    <div className="na-profile-role">{alum.currentRole}</div>
                  </div>

                  <div className="na-card-body">
                    <p className="na-profile-bio">{alum.bio}</p>
                    <button 
                      className="na-read-more-btn"
                      onClick={() => handleReadMore(alum.id)}
                    >
                      Read Full Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="na-no-results">
            <div className="na-no-results-icon">🔍</div>
            <h3 className="na-no-results-text">No alumni found</h3>
            <p className="na-no-results-subtext">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </section>

      {/* Hall of Fame Section */}
      {featuredAlumni.length > 0 && (
        <section className="na-hall-of-fame">
          <div className="na-hall-container">
            <h2 className="na-hall-title">Alumni Hall of Fame</h2>
            <p className="na-hall-subtitle">
              Celebrating our most distinguished alumni and their extraordinary achievements
            </p>
            
            <div className="na-hall-grid">
              {featuredAlumni.map((alum, index) => (
                <div key={alum.id} className="na-hall-card">
                  <div className="na-hall-achievement">
                    {alum.achievements[0]}
                  </div>
                  <h3 className="na-hall-name">{alum.name}</h3>
                  <div className="na-hall-details">
                    {alum.department} • Batch {alum.batch}
                  </div>
                  <div className="na-hall-details">
                    {alum.currentRole}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NotableAlumni;