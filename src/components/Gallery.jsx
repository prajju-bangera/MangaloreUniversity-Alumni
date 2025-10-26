import React, { useState, useRef, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [isHovered, setIsHovered] = useState(false);
  const galleryRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const galleryData = [
    {
      id: 1,
      title: 'Modern Campus Infrastructure',
      description: 'State-of-the-art facilities and learning environments',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      description: 'Celebrating athletic excellence and team spirit',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 3,
      title: 'Research Laboratory',
      description: 'Cutting-edge research and innovation spaces',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 4,
      title: 'Art Exhibition',
      description: 'Showcasing creative talents and artistic expressions',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 5,
      title: 'Library Resources',
      description: 'Extensive collection of knowledge and resources',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80'
    },
    {
      id: 6,
      title: 'Cultural Festival',
      description: 'Vibrant celebrations of diversity and traditions',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 7,
      title: 'Classroom Learning',
      description: 'Interactive and engaging educational experiences',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
    },
    {
      id: 8,
      title: 'Music Performance',
      description: 'Harmonious melodies and musical excellence',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 9,
      title: 'Student Commons',
      description: 'Spaces for collaboration and social interaction',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 10,
      title: 'Graduation Ceremony',
      description: 'Celebrating academic achievements and milestones',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 11,
      title: 'Science Laboratory',
      description: 'Hands-on experiments and scientific discovery',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 12,
      title: 'Drama Production',
      description: 'Theatrical performances and creative storytelling',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId;
    const speed = 0.5; // Adjust scroll speed

    const autoScroll = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += speed;
        
        // Reset to start when reaching end
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
  }, [isHovered]);

  const handleImageClick = (image) => {
    // In a real application, you might want to open a modal or lightbox here
    console.log('Image clicked:', image);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <div className="header-content">
          <h1 className="gallery-main-title">
            Photo Gallery
            <div className="gallery-title-underline"></div>
          </h1>
        
        </div>
      </div>

      <div className="gallery-container">
        {/* Horizontal Scroll Gallery */}
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
            {galleryData.map((item, index) => (
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
                </div>
                <div className="gallery-content">
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <p className="gallery-item-description">{item.description}</p>
                </div>
              </div>
            ))}
            
            {/* Duplicate items for seamless loop */}
            {galleryData.map((item) => (
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

        {/* Grid Gallery for smaller screens */}
        <div className="grid-gallery">
          {galleryData.map((item, index) => (
            <div 
              key={item.id} 
              className="grid-gallery-item"
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
              </div>
              <div className="gallery-content">
                <h3 className="gallery-item-title">{item.title}</h3>
                <p className="gallery-item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;