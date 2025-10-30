import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './NewsDescription.css';

const NewsDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Sample detailed news data (in real app, this would come from API)
  const newsData = {
    1: {
      id: 1,
      title: "Necessitatibus eius consequatur ex aliquid fuga eum quidem sint",
      date: "Tue, December 12",
      author: "Julia Parker",
      category: "university-news",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      excerpt: "Eum ad dolor et. Autem aut fugiat debitis. Illum voluptas ab enim placcat. Adipisci enim velit nulla. Vel omnis laudentum. Asperiores eum ipsa est officis. Modi qui magni est...",
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        <h3>Key Highlights</h3>
        <ul>
          <li>Innovative research in artificial intelligence</li>
          <li>Collaboration with industry leaders</li>
          <li>Student-led projects making real-world impact</li>
          <li>Future plans for campus expansion</li>
        </ul>
        
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        
        <blockquote>
          "This initiative represents a significant step forward in our commitment to innovation and excellence in education. We're proud to lead the way in technological advancement."
        </blockquote>
        
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      `,
      tags: ["Research", "Innovation", "Technology", "Education"],
      readTime: "5 min read"
    },
    2: {
      id: 2,
      title: "Et repellendus molestiae qui est sed omnis",
      date: "Fri, September 05",
      author: "Mario Douglas",
      category: "alumni-spotlights",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      excerpt: "Voluptatem nescium omnis libero autem tempora enim ut ipsam id. Odit quia ab eum assumenda. Quisquam omnis doloribus...",
      content: `
        <p>Alumni success stories continue to inspire our current students and demonstrate the lasting impact of a Mangalore University education.</p>
        
        <p>Our graduates are making waves in various industries, from technology and healthcare to arts and public service.</p>
        
        <h3>Alumni Achievements</h3>
        <ul>
          <li>Leadership roles in Fortune 500 companies</li>
          <li>Groundbreaking research publications</li>
          <li>Community service initiatives</li>
          <li>Entrepreneurial ventures</li>
        </ul>
      `,
      tags: ["Alumni", "Success", "Career", "Achievement"],
      readTime: "4 min read"
    },
    // Add more news items as needed...
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const item = newsData[id];
      if (item) {
        setNewsItem(item);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <div className="news-description-loading">
        <div className="loading-spinner"></div>
        <p>Loading news article...</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="news-description-error">
        <h2>Article Not Found</h2>
        <p>The news article you're looking for doesn't exist.</p>
        <button onClick={handleBackClick} className="back-button">
          ← Back to News
        </button>
      </div>
    );
  }

  return (
    <div className="news-description-page">
      {/* Background Elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="news-description-container">
        {/* Navigation */}
        <nav className="news-description-nav">
          <button onClick={handleBackClick} className="back-button">
            <span className="back-arrow">←</span>
            Back to News
          </button>
          <Link to="/" className="home-link">
            Home
          </Link>
        </nav>

        {/* Article Header */}
        <article className="news-article">
          <header className="article-header">
            <div className="article-meta">
              <span className="article-category">{newsItem.category.replace('-', ' ')}</span>
              <span className="article-date">{newsItem.date}</span>
              <span className="article-read-time">{newsItem.readTime}</span>
            </div>
            
            <h1 className="article-title">{newsItem.title}</h1>
            
            <div className="article-author">
              <div className="author-avatar">
                {newsItem.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="author-info">
                <span className="author-name">By {newsItem.author}</span>
                <span className="author-role">University Correspondent</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="article-image-container">
            <div className={`image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
              <img 
                src={newsItem.image} 
                alt={newsItem.title}
                onLoad={handleImageLoad}
                className="article-featured-image"
              />
              <div className="image-overlay"></div>
            </div>
            {!imageLoaded && <div className="image-skeleton"></div>}
          </div>

          {/* Article Content */}
          <div className="article-content">
            <div className="content-wrapper">
              <div 
                className="article-body"
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
              />
              
              {/* Tags */}
              <div className="article-tags">
                {newsItem.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Social Share */}
            </div>

            {/* Sidebar */}
            <aside className="article-sidebar">
              <div className="sidebar-card">
                <h4>About the Author</h4>
                <div className="author-details">
                  <div className="sidebar-avatar">
                    {newsItem.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="sidebar-author-info">
                    <strong>{newsItem.author}</strong>
                    <span>University Correspondent</span>
                    <p>Bringing you the latest updates from Mangalore University.</p>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h4>Related Articles</h4>
                <div className="related-articles">
                  {Object.values(newsData)
                    .filter(item => item.id !== newsItem.id)
                    .slice(0, 3)
                    .map(item => (
                      <Link 
                        key={item.id} 
                        to={`/news/${item.id}`}
                        className="related-article"
                      >
                        <img src={item.image} alt={item.title} />
                        <div className="related-content">
                          <h5>{item.title}</h5>
                          <span>{item.date}</span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* Newsletter Subscription */}
        {/* <section className="newsletter-section">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Get the latest news and updates from Mangalore University delivered to your inbox.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default NewsDescription;