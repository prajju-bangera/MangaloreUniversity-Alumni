import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = ({ onClose, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-modal">
      <div className="auth-backdrop" onClick={onClose}></div>
      <div className="auth-container">
        <button className="auth-close" onClick={onClose}>
          ×
        </button>

        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your alumni account</p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field with Eye Icon */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="password-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {showPassword ? (
                    // Eye Slash (Hidden)
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 
                      19c-4.478 0-8.268-2.943-9.543-7a9.97 
                      9.97 0 011.563-3.029m5.858.908a3 
                      3 0 114.243 4.243M9.878 9.878l4.242 
                      4.242M9.878 9.878L8.464 8.464M9.878 
                      9.878l-.88-.88m4.242 4.242L13.12 13.12"
                    />
                  ) : (
                    // Eye Open (Visible)
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 
                        0 8.268 2.943 9.542 7-1.274 4.057-5.064 
                        7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot" className="forgot-link">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don’t have an account?{" "}
            <button onClick={switchToRegister} className="auth-switch-btn">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
