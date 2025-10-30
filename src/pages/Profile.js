import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    graduationYear: '',
    degree: '',
    location: '',
    profilePicture: ''
  });
  const [profileImage, setProfileImage] = useState(null);

  // Mock data for connections and events
  const [connections, setConnections] = useState({
    sent: [
      { id: 1, name: 'Raj Kumar', avatar: 'RK', status: 'pending', date: '2024-01-15' },
      { id: 2, name: 'Priya Sharma', avatar: 'PS', status: 'pending', date: '2024-01-10' }
    ],
    received: [
      { id: 3, name: 'Amit Patel', avatar: 'AP', status: 'pending', date: '2024-01-12' },
      { id: 4, name: 'Sneha Reddy', avatar: 'SR', status: 'pending', date: '2024-01-08' }
    ],
    accepted: [
      { id: 5, name: 'Mike Johnson', avatar: 'MJ', status: 'accepted', date: '2024-01-05' }
    ]
  });

  const [events, setEvents] = useState({
    interested: [
      { id: 1, title: 'Annual Alumni Meet 2024', date: '2024-02-15', location: 'New York' },
      { id: 2, title: 'Tech Conference 2024', date: '2024-03-20', location: 'San Francisco' }
    ],
    notInterested: [
      { id: 3, title: 'Charity Golf Tournament', date: '2024-02-28', location: 'Boston' }
    ]
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        graduationYear: user.graduationYear || '',
        degree: user.degree || '',
        location: user.location || '',
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        setFormData({
          ...formData,
          profilePicture: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      graduationYear: user.graduationYear,
      degree: user.degree,
      location: user.location,
      profilePicture: user.profilePicture
    });
    setProfileImage(null);
    setIsEditing(false);
  };

  const handleConnectionAction = (connectionId, action) => {
    setConnections(prev => {
      const received = [...prev.received];
      const accepted = [...prev.accepted];
      const connectionIndex = received.findIndex(conn => conn.id === connectionId);
      
      if (connectionIndex !== -1) {
        const connection = received[connectionIndex];
        if (action === 'accept') {
          connection.status = 'accepted';
          accepted.push(connection);
        }
        received.splice(connectionIndex, 1);
      }
      
      return {
        ...prev,
        received,
        accepted
      };
    });
  };

  const handleEventAction = (eventId, action) => {
    setEvents(prev => {
      const interested = [...prev.interested];
      const notInterested = [...prev.notInterested];
      
      let event, fromArray, toArray;
      
      // Find event in interested array
      const interestedIndex = interested.findIndex(e => e.id === eventId);
      if (interestedIndex !== -1) {
        event = interested[interestedIndex];
        fromArray = interested;
        toArray = notInterested;
      } else {
        // Find event in notInterested array
        const notInterestedIndex = notInterested.findIndex(e => e.id === eventId);
        if (notInterestedIndex !== -1) {
          event = notInterested[notInterestedIndex];
          fromArray = notInterested;
          toArray = interested;
        }
      }
      
      if (event && fromArray && toArray) {
        const eventIndex = fromArray.findIndex(e => e.id === eventId);
        fromArray.splice(eventIndex, 1);
        toArray.push(event);
      }
      
      return {
        interested,
        notInterested
      };
    });
  };

  // Generate avatar from name initials
  const getAvatarInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  // Add floating particles for background animation
  const FloatingParticles = () => (
    <>
      <div className="floating-particle"></div>
      <div className="floating-particle"></div>
      <div className="floating-particle"></div>
    </>
  );

  if (!user) {
    return (
      <div className="profile-page">
        <FloatingParticles />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <FloatingParticles />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your alumni account information</p>
        </div>

        <div className="profile-content">
          {/* Left Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-avatar-section">
              <div className="profile-avatar-large">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-image" />
                ) : user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="profile-image" />
                ) : (
                  getAvatarInitials(user.name)
                )}
                {isEditing && (
                  <div className="image-upload-overlay">
                    <label htmlFor="profile-image-upload" className="upload-label">
                      <i className="fas fa-camera"></i>
                      Change Photo
                    </label>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="image-upload-input"
                    />
                  </div>
                )}
              </div>
              <div className="user-name">{user.name}</div>
              <div className="user-title">Alumni Member</div>
            </div>

            <div className="profile-stats">
              <div 
                className={`stat-card ${activeSection === 'connections' ? 'active' : ''}`}
                onClick={() => setActiveSection('connections')}
              >
                <div className="stat">
                  <strong>{user.connections || 0}</strong>
                  <span>Connections</span>
                </div>
              </div>
              <div 
                className={`stat-card ${activeSection === 'events' ? 'active' : ''}`}
                onClick={() => setActiveSection('events')}
              >
                <div className="stat">
                  <strong>{user.eventsAttended || 0}</strong>
                  <span>Events Attended</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat">
                  <strong>{user.jobsPosted || 0}</strong>
                  <span>Jobs Posted</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat">
                  <span>Member since {user.memberSince || '2024'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-main">
            {activeSection === 'profile' && (
              <form onSubmit={handleSubmit} className="profile-form">
                {/* Personal Information Section */}
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="edit-input"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="display-value">{user.name || 'Not provided'}</div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="edit-input"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="display-value">{user.email || 'Not provided'}</div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="edit-input"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <div className="display-value">{user.phone || 'Not provided'}</div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="edit-input"
                          placeholder="Enter your location"
                        />
                      ) : (
                        <div className="display-value">{user.location || 'Not provided'}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="form-section">
                  <h3>Education</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Degree</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="degree"
                          value={formData.degree}
                          onChange={handleChange}
                          className="edit-input"
                          placeholder="e.g., Bachelor of Science"
                        />
                      ) : (
                        <div className="display-value">{user.degree || 'Not provided'}</div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>Graduation Year</label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleChange}
                          className="edit-input"
                          placeholder="e.g., 2020"
                          min="1950"
                          max="2030"
                        />
                      ) : (
                        <div className="display-value">{user.graduationYear || 'Not provided'}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="profile-actions">
                  {!isEditing ? (
                    <button 
                      type="button"
                      className="edit-profile-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      ✏️ Edit Profile
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button type="submit" className="save-btn">
                        💾 Save Changes
                      </button>
                      <button type="button" className="cancel-btn" onClick={handleCancel}>
                        ❌ Cancel
                      </button>
                    </div>
                  )}
                </div>
              </form>
            )}

            {activeSection === 'connections' && (
              <div className="connections-section">
                <h3>Connection Requests</h3>
                
                {/* Received Connection Requests */}
                <div className="connection-requests">
                  <h4>Received Requests ({connections.received.length})</h4>
                  {connections.received.length > 0 ? (
                    <div className="requests-list">
                      {connections.received.map(connection => (
                        <div key={connection.id} className="connection-card">
                          <div className="connection-avatar">
                            {connection.avatar}
                          </div>
                          <div className="connection-info">
                            <h5>{connection.name}</h5>
                            <p>Sent on {connection.date}</p>
                          </div>
                          <div className="connection-actions">
                            <button 
                              className="accept-btn"
                              onClick={() => handleConnectionAction(connection.id, 'accept')}
                            >
                              Accept
                            </button>
                            <button 
                              className="decline-btn"
                              onClick={() => handleConnectionAction(connection.id, 'decline')}
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-requests">No pending connection requests</p>
                  )}
                </div>

                {/* Sent Connection Requests */}
                <div className="sent-requests">
                  <h4>Sent Requests ({connections.sent.length})</h4>
                  {connections.sent.length > 0 ? (
                    <div className="requests-list">
                      {connections.sent.map(connection => (
                        <div key={connection.id} className="connection-card">
                          <div className="connection-avatar">
                            {connection.avatar}
                          </div>
                          <div className="connection-info">
                            <h5>{connection.name}</h5>
                            <p>Sent on {connection.date}</p>
                            <span className="status pending">Pending</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-requests">No sent connection requests</p>
                  )}
                </div>

                {/* Accepted Connections */}
                <div className="accepted-connections">
                  <h4>Your Connections ({connections.accepted.length})</h4>
                  {connections.accepted.length > 0 ? (
                    <div className="connections-grid">
                      {connections.accepted.map(connection => (
                        <div key={connection.id} className="connection-card">
                          <div className="connection-avatar">
                            {connection.avatar}
                          </div>
                          <div className="connection-info">
                            <h5>{connection.name}</h5>
                            <p>Connected since {connection.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-requests">No connections yet</p>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'events' && (
              <div className="events-section">
                <h3>Event Management</h3>
                
                {/* Interested Events */}
                <div className="events-category">
                  <h4>Interested Events ({events.interested.length})</h4>
                  {events.interested.length > 0 ? (
                    <div className="events-list">
                      {events.interested.map(event => (
                        <div key={event.id} className="event-card">
                          <div className="event-info">
                            <h5>{event.title}</h5>
                            <p>📅 {event.date} | 📍 {event.location}</p>
                          </div>
                          <button 
                            className="event-action-btn not-interested"
                            onClick={() => handleEventAction(event.id, 'remove')}
                          >
                            Not Interested
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-events">No interested events</p>
                  )}
                </div>

                {/* Not Interested Events */}
                <div className="events-category">
                  <h4>Not Interested ({events.notInterested.length})</h4>
                  {events.notInterested.length > 0 ? (
                    <div className="events-list">
                      {events.notInterested.map(event => (
                        <div key={event.id} className="event-card">
                          <div className="event-info">
                            <h5>{event.title}</h5>
                            <p>📅 {event.date} | 📍 {event.location}</p>
                          </div>
                          <button 
                            className="event-action-btn interested"
                            onClick={() => handleEventAction(event.id, 'add')}
                          >
                            Mark Interested
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-events">No events marked as not interested</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;