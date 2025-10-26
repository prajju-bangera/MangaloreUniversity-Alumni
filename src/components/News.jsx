import React, { useState, useEffect } from 'react';
import './News.css';

const News = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Show 6 items per page
  const [animateCards, setAnimateCards] = useState(false);

  // Sample news data with actual image URLs
  const newsItems = [
    {
      id: 1,
      title: "Necessitatibus eius consequatur ex aliquid fuga eum quidem sint",
      date: "Tue, December 12",
      author: "Julia Parker",
      category: "university-news",
      excerpt: "Eum ad dolor et. Autem aut fugiat debitis. Illum voluptas ab enim placcat. Adipisci enim velit nulla. Vel omnis laudentum. Asperiores eum ipsa est officis. Modi qui magni est...",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Et repellendus molestiae qui est sed omnis",
      date: "Fri, September 05",
      author: "Mario Douglas",
      category: "alumni-spotlights",
      excerpt: "Voluptatem nescium omnis libero autem tempora enim ut ipsam id. Odit quia ab eum assumenda. Quisquam omnis doloribus...",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "Quia assumenda est et veritati",
      date: "Tue, July 27",
      author: "Lisa Hunter",
      category: "career-stories",
      excerpt: "Quia nam eaque omnis explicabo similique eum quierat similique laboriosam. Quis omnis repellat sed quae consectetur magnam...",
      image: "https://images.unsplash.com/photo-1551836026-d5c88ac5c4fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Pariatur quia facilis similique deleniti",
      date: "Tue, Sep 16",
      author: "Mario Douglas",
      category: "newsletters",
      excerpt: "Et consequatur eveniet nam voluptas commodi cumque ea est ex. Aut quis omnis sint ipsum earum quia eligendi...",
      pdfLink: "/documents/newsletter-sep-2023.pdf",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
    {
      id: 5,
      title: "Alumni Spotlight: John Smith's Journey to Success",
      date: "Mon, November 15",
      author: "Sarah Johnson",
      category: "alumni-spotlights",
      excerpt: "John Smith, class of 2010, shares his inspiring journey from campus to becoming a leading tech entrepreneur...",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      title: "University Announces New Research Center",
      date: "Wed, October 20",
      author: "Robert Chen",
      category: "university-news",
      excerpt: "The university is proud to announce the opening of the new Center for Advanced Technology and Innovation...",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 7,
      title: "Career Growth in Digital Era",
      date: "Mon, August 14",
      author: "Emma Wilson",
      category: "career-stories",
      excerpt: "How alumni are adapting to the rapidly changing digital landscape and finding new opportunities...",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 8,
      title: "Monthly Alumni Newsletter",
      date: "Fri, November 30",
      author: "Alumni Association",
      category: "newsletters",
      excerpt: "Latest updates from the alumni community, upcoming events, and success stories...",
      pdfLink: "/documents/newsletter-nov-2023.pdf",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
    }
  ];

  // Filter news based on active category
  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  // Category labels
  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'alumni-spotlights', name: 'Alumni Spotlights' },
    { id: 'university-news', name: 'University News' },
    { id: 'career-stories', name: 'Career Stories' },
    { id: 'newsletters', name: 'Newsletters' }
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Handle category change with throw animation
  const handleCategoryChange = (categoryId) => {
    setAnimateCards(true);
    setTimeout(() => {
      setActiveCategory(categoryId);
      setCurrentPage(1);
      setAnimateCards(false);
    }, 500);
  };

  // Handle page change - REMOVED automatic scroll
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Removed window.scrollTo to prevent scrolling to top
  };

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <div className="news-page" id="news-section">
      <div className="news-header">
        <div className="title-container">
          <h1 className="news-main-title">
            News & Stories
            <div className="news-title-underline"></div>
          </h1>
        </div>
        <p className="news-subtitle">
          Stay updated with the latest news, alumni achievements, and inspiring stories from our community.
        </p>
      </div>

      <div className="news-container">
        <div className="news-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={`news-grid ${animateCards ? 'throw-out' : 'throw-in'}`}>
          {currentItems.map((item, index) => (
            <div 
              key={item.id} 
              className="news-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="news-image">
                <img src={item.image} alt={item.title} />
                <div className="news-category-tag">{categories.find(cat => cat.id === item.category)?.name}</div>
                <div className="image-overlay"></div>
              </div>
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-date">{item.date}</span>
                  <span className="news-author">/ {item.author}</span>
                </div>
                <h3 className="news-headline">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <div className="news-action">
                  {item.category === 'newsletters' ? (
                    <a href={item.pdfLink} className="read-more-btn" download>
                      Download PDF <span className="arrow">↓</span>
                    </a>
                  ) : (
                    <button className="read-more-btn">
                      Read More <span className="arrow">→</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredNews.length > itemsPerPage && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredNews.length)} of {filteredNews.length} items
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

export default News;