import React, { useState, useRef, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const galleryRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);

  const galleryData = [
    {
      id: 1,
      title: 'Modern Campus Infrastructure',
      description: 'State-of-the-art facilities and learning environments',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      year: 2024,
      type: 'campus'
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      description: 'Celebrating athletic excellence and team spirit',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      year: 2024,
      type: 'events'
    },
    {
      id: 3,
      title: 'Research Laboratory',
      description: 'Cutting-edge research and innovation spaces',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      year: 2023,
      type: 'campus'
    },
    {
      id: 4,
      title: 'Art Exhibition',
      description: 'Showcasing creative talents and artistic expressions',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      year: 2023,
      type: 'events'
    },
    {
      id: 5,
      title: 'Library Resources',
      description: 'Extensive collection of knowledge and resources',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80',
      year: 2022,
      type: 'campus'
    },
    {
      id: 6,
      title: 'Cultural Festival',
      description: 'Vibrant celebrations of diversity and traditions',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      year: 2022,
      type: 'events'
    },
    {
      id: 7,
      title: 'Convocation Ceremony',
      description: 'Celebrating academic achievements and new beginnings',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      year: 2024,
      type: 'academic'
    },
    {
      id: 8,
      title: 'Alumni Meet',
      description: 'Reconnecting with our esteemed alumni community',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      year: 2023,
      type: 'alumni'
    },
    {
      id: 9,
      title: 'Science Fair',
      description: 'Innovative projects and scientific discoveries',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      year: 2022,
      type: 'academic'
    },
    {
      id: 10,
      title: 'Student Club Activities',
      description: 'Engaging extracurricular activities and club events',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      year: 2024,
      type: 'student-life'
    }
  ];

  // Get unique years and types for filters
  const years = ['all', ...new Set(galleryData.map(item => item.year))].sort((a, b) => b - a);
  const types = ['all', ...new Set(galleryData.map(item => item.type))];

  // Filter gallery data based on selected filters
  const filteredGalleryData = galleryData.filter(item => {
    const yearMatch = selectedYear === 'all' || item.year === parseInt(selectedYear);
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    return yearMatch && typeMatch;
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setIsYearDropdownOpen(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset to first slide when filters change
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedYear, selectedType]);

  // Auto-scroll animation for desktop
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || filteredGalleryData.length === 0) return;

    let animationId;
    const speed = 0.5;

    const autoScroll = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += speed;
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered, filteredGalleryData]);

  // Auto-play for mobile slider
  useEffect(() => {
    if (!isAutoPlaying || filteredGalleryData.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredGalleryData.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, filteredGalleryData.length]);

  const handleImageClick = (image) => {
    console.log('Image clicked:', image);
  };

  // Mobile slider navigation
  const nextSlide = () => {
    if (filteredGalleryData.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % filteredGalleryData.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    if (filteredGalleryData.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + filteredGalleryData.length) % filteredGalleryData.length);
    resetAutoPlay();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  const handleMobileSliderClick = (image) => {
    console.log('Mobile slider image clicked:', image);
  };

  const handleYearFilter = (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
  };

  const toggleYearDropdown = () => {
    setIsYearDropdownOpen(!isYearDropdownOpen);
    setIsTypeDropdownOpen(false);
  };

  const toggleTypeDropdown = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
    setIsYearDropdownOpen(false);
  };

  // Type labels for display
  const typeLabels = {
    'all': 'All Types',
    'campus': 'Campus',
    'events': 'Events',
    'academic': 'Academic',
    'alumni': 'Alumni',
    'student-life': 'Student Life'
  };

  // Get display value for dropdowns
  const getYearDisplayValue = (year) => year === 'all' ? 'All Years' : year;
  const getTypeDisplayValue = (type) => typeLabels[type];

  return (
    <div className="gallery-page" id='gallery-page'>
      <div className="gallery-header">
        <div className="header-content">
          <h1 className="gallery-main-title">
            Photo Gallery
            <div className="gallery-title-underline"></div>
          </h1>
          <p className="gallery-subtitle">
            Explore our vibrant campus life through stunning visuals and memorable moments
          </p>
        </div>
      </div>

      <div className="gallery-container">
        {/* Filter Section with Dropdowns */}
        <div className="gallery-filters">
          <div className="gallery-filters-row">
            {/* Year Filter - Left Side */}
            <div className="gallery-filter-group gallery-left-filter">
              <label className="gallery-filter-label">Filter by Year:</label>
              <div className="gallery-dropdown-container" ref={yearDropdownRef}>
                <button 
                  className="gallery-dropdown-toggle"
                  onClick={toggleYearDropdown}
                >
                  <span>{getYearDisplayValue(selectedYear)}</span>
                  <span className={`gallery-dropdown-arrow ${isYearDropdownOpen ? 'open' : ''}`}>▼</span>
                </button>
                <div className={`gallery-dropdown-menu ${isYearDropdownOpen ? 'show' : ''}`}>
                  {years.map(year => (
                    <div
                      key={year}
                      className={`gallery-dropdown-item ${selectedYear === year ? 'selected' : ''}`}
                      onClick={() => handleYearFilter(year)}
                    >
                      {getYearDisplayValue(year)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Type Filter - Right Side */}
            <div className="gallery-filter-group gallery-right-filter">
              <label className="gallery-filter-label">Filter by Type:</label>
              <div className="gallery-dropdown-container" ref={typeDropdownRef}>
                <button 
                  className="gallery-dropdown-toggle"
                  onClick={toggleTypeDropdown}
                >
                  <span>{getTypeDisplayValue(selectedType)}</span>
                  <span className={`gallery-dropdown-arrow ${isTypeDropdownOpen ? 'open' : ''}`}>▼</span>
                </button>
                <div className={`gallery-dropdown-menu ${isTypeDropdownOpen ? 'show' : ''}`}>
                  {types.map(type => (
                    <div
                      key={type}
                      className={`gallery-dropdown-item ${selectedType === type ? 'selected' : ''}`}
                      onClick={() => handleTypeFilter(type)}
                    >
                      {getTypeDisplayValue(type)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="gallery-filter-results">
            <span className="gallery-results-count">
              Showing {filteredGalleryData.length} of {galleryData.length} photos
            </span>
            {(selectedYear !== 'all' || selectedType !== 'all') && (
              <button 
                className="gallery-clear-filters-btn"
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedType('all');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {filteredGalleryData.length === 0 ? (
          <div className="gallery-no-results">
            <h3>No photos found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <>
            {/* Horizontal Scroll Gallery - Desktop */}
            <div 
              className="horizontal-gallery-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              ref={galleryRef}
            >
              <div 
                className="horizontal-gallery-scroll"
                ref={scrollContainerRef}
              >
                {filteredGalleryData.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="gallery-item"
                    onClick={() => handleImageClick(item)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="gallery-image-container">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="gallery-image"
                      />
                      <div className="image-overlay"></div>
                      <div className="gallery-badges">
                        <span className="gallery-year-badge">{item.year}</span>
                        <span className="gallery-type-badge">{typeLabels[item.type]}</span>
                      </div>
                    </div>
                    <div className="gallery-content">
                      <h3 className="gallery-item-title">{item.title}</h3>
                      <p className="gallery-item-description">{item.description}</p>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate items for seamless loop */}
                {filteredGalleryData.map((item) => (
                  <div 
                    key={`duplicate-${item.id}`} 
                    className="gallery-item duplicate"
                    onClick={() => handleImageClick(item)}
                  >
                    <div className="gallery-image-container">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="gallery-image"
                      />
                      <div className="image-overlay"></div>
                      <div className="gallery-badges">
                        <span className="gallery-year-badge">{item.year}</span>
                        <span className="gallery-type-badge">{typeLabels[item.type]}</span>
                      </div>
                    </div>
                    <div className="gallery-content">
                      <h3 className="gallery-item-title">{item.title}</h3>
                      <p className="gallery-item-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Scroll indicators */}
              <div className="scroll-indicators1">
                <div className={`scroll-indicator1 ${isHovered ? 'paused' : 'scrolling'}`}>
                  <span>Scroll {isHovered ? 'Paused' : 'Auto'}</span>
                </div>
              </div>
            </div>

            {/* Mobile Slider Gallery */}
            <div className="mobile-slider-gallery">
              <div className="mobile-auto-scroll-indicator">
                {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
              </div>
              
              <div 
                className="mobile-slider-container"
                ref={mobileSliderRef}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {filteredGalleryData.map((item, index) => (
                  <div 
                    key={item.id}
                    className="mobile-slide"
                    onClick={() => handleMobileSliderClick(item)}
                  >
                    <div className="mobile-slide-image">
                      <img 
                        src={item.image} 
                        alt={item.title}
                      />
                      <div className="image-overlay"></div>
                      <div className="gallery-badges">
                        <span className="gallery-year-badge">{item.year}</span>
                        <span className="gallery-type-badge">{typeLabels[item.type]}</span>
                      </div>
                    </div>
                    <div className="mobile-slide-content">
                      <h3 className="mobile-slide-title">{item.title}</h3>
                      <p className="mobile-slide-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="mobile-slider-controls">
                <button className="mobile-slider-btn" onClick={prevSlide}>
                  ‹
                </button>
                
                <div className="mobile-slider-dots">
                  {filteredGalleryData.map((_, index) => (
                    <div
                      key={index}
                      className={`mobile-slider-dot ${currentSlide === index ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
                
                <button className="mobile-slider-btn" onClick={nextSlide}>
                  ›
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;