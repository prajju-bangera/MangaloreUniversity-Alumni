// components/ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isMapHovered, setIsMapHovered] = useState(false);

  // University coordinates
  const universityLocation = {
    latitude: 12.8143206,
    longitude: 74.9232578,
    address: "Mangalore University, Mudipu, Konaje Proper, Mangalore, Karnataka",
    name: "Mangalore University"
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  // Function to open navigation
  const openNavigation = () => {
    // Check if device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${universityLocation.latitude},${universityLocation.longitude}&travelmode=driving&destination_place_id=ChIJv8VpC9YbrjsR8C7e1q-9a6c`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/dir//Mangalore+University,+Mudipu,+Konaje+Proper,+Mangalore,+Karnataka/@${universityLocation.latitude},${universityLocation.longitude},13z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3ba35f2ec005f2eb:0xd3b610cab9c54fac!2m2!1d74.9232578!2d12.8143206?entry=ttu`;
      window.open(url, '_blank');
    }
  };

  // Function to open in specific map apps
  const openMapApp = (app) => {
    const { latitude, longitude, name } = universityLocation;
    
    switch(app) {
      case 'google':
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving&destination_place_id=ChIJv8VpC9YbrjsR8C7e1q-9a6c`;
        window.open(googleMapsUrl, '_blank');
        break;
      
      case 'apple':
        const appleMapsUrl = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d&q=${encodeURIComponent(name)}`;
        window.open(appleMapsUrl, '_blank');
        break;
      
      case 'waze':
        const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes&q=${encodeURIComponent(name)}`;
        window.open(wazeUrl, '_blank');
        break;

      case 'view':
        const viewUrl = `https://www.google.com/maps/place/Mangalore+University/@${latitude},${longitude},15z/data=!3m1!4b1!4m6!3m5!1s0x3ba35f2ec005f2eb:0xd3b610cab9c54fac!8m2!3d12.8143206!4d74.9232578!16s%2Fg%2F1216f4_f?entry=ttu`;
        window.open(viewUrl, '_blank');
        break;
      
      default:
        openNavigation();
    }
  };

  return (
    <div className="contact-us" id="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <p>Have questions, feedback, or suggestions? We're here to help!</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="membership">Membership</option>
                      <option value="events">Events</option>
                      <option value="mentorship">Mentorship Program</option>
                      <option value="donation">Donation</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="map-section">
              <div 
                className="map-container"
                onMouseEnter={() => setIsMapHovered(true)}
                onMouseLeave={() => setIsMapHovered(false)}
              >
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.715363369752!2d74.87146157599787!3d12.855738487450614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35f2ec005f2eb%3A0xd3b610cab9c54fac!2sMangalore%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mangalore University Location"
                ></iframe>
                
                {/* Get Directions Button - Only shown on hover */}
                <div className={`directions-overlay ${isMapHovered ? 'visible' : ''}`}>
                  <button 
                    className="directions-btn"
                    onClick={openNavigation}
                    title="Get directions to Mangalore University"
                  >
                    🗺️ Get Directions
                  </button>
                </div>
              </div>

              {/* Contact Information - 2x2 Grid */}
              <div className="contact-info-single-line">
                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-content">
                    <h4>Office Address</h4>
                    <p>Mangalore University Alumni Association</p>
                    <p>Mudipu, Konaje Proper, Mangalore, Karnataka</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-content">
                    <h4>Phone Numbers</h4>
                    <p>+91 824 2287 311</p>
                    <p>+91 824 2287 312</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-content">
                    <h4>Email Addresses</h4>
                    <p>alumni@mangaloreuniversity.edu</p>
                    <p>support@mualumni.org</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">🕒</div>
                  <div className="contact-content">
                    <h4>Office Hours</h4>
                    <p>Mon-Fri: 9AM-5PM</p>
                    <p>Sat: 9AM-1PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media - Single Line */}
            {/* Social Media - Single Line */}
            <div className="social-media-section">
              <h3>Follow Us</h3>
              <p>Stay connected through our social media channels</p>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                    alt="Facebook"
                  />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg"
                    alt="Twitter"
                  />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                    alt="LinkedIn"
                  />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                    alt="Instagram"
                  />
                </a>
              </div>
            </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;