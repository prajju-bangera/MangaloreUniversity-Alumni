import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [animateCards, setAnimateCards] = useState(false);

  const eventsData = [
    {
      id: 1,
      category: 'sports',
      title: 'Annual Sports Day',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
      time: '08:30 AM - 05:00 PM',
      location: 'School Playground',
      date: '2025-03-10'
    },
    {
      id: 2,
      category: 'academic',
      title: 'Science Fair Exhibition',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      time: '09:00 AM - 03:00 PM',
      location: 'Main Auditorium',
      date: '2025-03-15'
    },
    {
      id: 3,
      category: 'arts',
      title: 'Spring Music Concert',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
      time: '07:00 PM - 09:00 PM',
      location: 'Cultural Hall',
      date: '2025-03-20'
    },
    {
      id: 4,
      category: 'community',
      title: 'Parent-Teacher Conference',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
      time: '10:00 AM - 04:00 PM',
      location: 'Conference Center',
      date: '2025-04-02'
    },
    {
      id: 5,
      category: 'academic',
      title: 'Tech Innovation Summit',
      description: 'Explore the latest technological advancements and innovations in the field of computer science and engineering.',
      time: '10:00 AM - 06:00 PM',
      location: 'Tech Building',
      date: '2025-04-10'
    },
    {
      id: 6,
      category: 'arts',
      title: 'Art Gallery Opening',
      description: 'Experience stunning artworks from talented students and featured artists in our annual gallery exhibition.',
      time: '06:00 PM - 09:00 PM',
      location: 'Art Gallery',
      date: '2025-04-15'
    },
    {
      id: 7,
      category: 'sports',
      title: 'Basketball Championship',
      description: 'Witness the thrilling finals of our annual inter-school basketball championship tournament.',
      time: '02:00 PM - 06:00 PM',
      location: 'Sports Complex',
      date: '2025-04-20'
    },
    {
      id: 8,
      category: 'community',
      title: 'Community Service Day',
      description: 'Join us for a day of giving back to the community through various service activities and initiatives.',
      time: '09:00 AM - 02:00 PM',
      location: 'Community Center',
      date: '2025-04-25'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'academic', name: 'ACADEMIC' },
    { id: 'arts', name: 'ARTS' },
    { id: 'sports', name: 'SPORTS' },
    { id: 'community', name: 'COMMUNITY' }
  ];

  const filteredEvents = activeCategory === 'all' 
    ? eventsData 
    : eventsData.filter(event => event.category === activeCategory);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handleRegister = (eventTitle) => {
    alert(`Thank you for registering for: ${eventTitle}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return { month, day, year };
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (categoryId) => {
    setAnimateCards(true);
    setTimeout(() => {
      setActiveCategory(categoryId);
      setCurrentPage(1);
      setAnimateCards(false);
    }, 500);
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <div className="header-content">
          <h1 className="events-main-title">
            Events & Activities
            <div className="events-title-underline"></div>
          </h1>
          <p className="events-subtitle">
            Discover exciting events, activities, and opportunities to engage with our community throughout the year.
          </p>
        </div>
      </div>

      <div className="events-container">
        <div className="events-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={`events-grid ${animateCards ? 'shuffle-out' : 'shuffle-in'}`}>
          {currentItems.map((event, index) => {
            const { month, day, year } = formatDate(event.date);
            return (
              <div 
                key={event.id} 
                className="event-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="event-category-tag">{event.category.toUpperCase()}</div>
                
                <div className="event-date-badge">
                  <div className="date-month">{month}</div>
                  <div className="date-day">{day}</div>
                  <div className="date-year">{year}</div>
                </div>

                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="event-detail">
                      <span className="detail-time">{event.time}</span>
                    </div>
                    <div className="event-detail">
                      <span className="detail-location">{event.location}</span>
                    </div>
                  </div>

                  <div className="event-actions">
                   
                    <button 
                      className="register-btn"
                      onClick={() => handleRegister(event.title)}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {filteredEvents.length > itemsPerPage && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredEvents.length)} of {filteredEvents.length} events
            </div>
            <div className="pagination">
              <button 
                className="pagination-btn" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className="pagination-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;