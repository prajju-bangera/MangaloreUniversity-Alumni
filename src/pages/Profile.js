import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    graduationYear: '',
    degree: '',
    bio: '',
    location: ''
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
        bio: user.bio || '',
        location: user.location || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      // Show success animation or notification
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
      bio: user.bio,
      location: user.location
    });
    setIsEditing(false);
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
                {getAvatarInitials(user.name)}
              </div>
              <div className="user-name">{user.name}</div>
              <div className="user-title">Alumni Member</div>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
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
                  <strong>{user.connections || 0}</strong>
                  <span>Connections</span>
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

              {/* About Section */}
              <div className="form-section">
                <h3>About Me</h3>
                <div className="form-group full-width">
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself, your career, interests, and achievements..."
                      className="bio-textarea"
                      rows="4"
                    />
                  ) : (
                    <div className="display-value bio-display">
                      {user.bio || 'No bio provided yet. Share something about yourself!'}
                    </div>
                  )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;