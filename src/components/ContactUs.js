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
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.715363369752!2d74.87146157599787!3d12.855738487450614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b78df95a0c9%3A0x7c1a9c9e7bcec1a4!2sMangalore%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mangalore University Location"
                ></iframe>
                <div className="map-overlay">
                  <h4>📍 Mangalore University Campus</h4>
                  <p>Mangalagangothri, Konaje, Mangalore</p>
                </div>
              </div>

              {/* Contact Information Below Map - Single Line Flex */}
              <div className="contact-info-single-line">
                {/* Alumni Office Address */}
                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-content">
                    <h4>Office Address</h4>
                    <p>Mangalore University Alumni Association</p>
                    <p>Mangalagangothri, Mangalore - 574 199</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="contact-info-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-content">
                    <h4>Phone Numbers</h4>
                    <p>+91 824 2287 311</p>
                    <p>+91 824 2287 312</p>
                  </div>
                </div>

                {/* Email Addresses */}
                <div className="contact-info-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-content">
                    <h4>Email Addresses</h4>
                    <p>alumni@mangaloreuniversity.edu</p>
                    <p>support@mualumni.org</p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="contact-info-item">
                  <div className="contact-icon">🕒</div>
                  <div className="contact-content">
                    <h4>Office Hours</h4>
                    <p>Mon-Fri: 9AM-5PM</p>
                    <p>Sat: 9AM-1PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-media-section">
                <h3>Follow Us</h3>
                <p>Stay connected through our social media channels</p>
                <div className="social-icons">
                  <a href="#" className="social-icon facebook" aria-label="Facebook">
                    <span className="social-emoji">📘</span>
                    <span className="social-text">Facebook</span>
                  </a>
                  <a href="#" className="social-icon twitter" aria-label="Twitter">
                    <span className="social-emoji">🐦</span>
                    <span className="social-text">Twitter</span>
                  </a>
                  <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                    <span className="social-emoji">💼</span>
                    <span className="social-text">LinkedIn</span>
                  </a>
                  <a href="#" className="social-icon instagram" aria-label="Instagram">
                    <span className="social-emoji">📷</span>
                    <span className="social-text">Instagram</span>
                  </a>
                  <a href="#" className="social-icon youtube" aria-label="YouTube">
                    <span className="social-emoji">📺</span>
                    <span className="social-text">YouTube</span>
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