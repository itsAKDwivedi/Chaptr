import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState(null); // State for success or error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Navigate to login page after registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post("https://chaptr-mg42.onrender.com/api/v1/auth/register", formData);

      if (response.data.success) {
        setMessage({ text: response.data.message, type: "success" });
        // Redirect to login page after successful registration
        setTimeout(() => navigate("/login"), 6000);
      } else {
        setMessage({ text: response.data.message, type: "error" });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage({ text: "Registration failed. Please try again.", type: "error" });
    }

    setLoading(false); // Stop loading
  };

  return (
    <Layout>
      <div className="register-page-container">
        <div className="register-card fadeIn">
          <h1 className="register-title centered-text">Register</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="register-form-group">
              <label htmlFor="name" className="register-form-label paragraph">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="register-form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="register-form-group">
              <label htmlFor="email" className="register-form-label paragraph">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="register-form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="register-form-group">
              <label htmlFor="password" className="register-form-label paragraph">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="register-form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="register-form-group">
              <label htmlFor="phone" className="register-form-label paragraph">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="register-form-input"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Address Field */}
            <div className="register-form-group">
              <label htmlFor="address" className="register-form-label paragraph">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="register-form-input"
                placeholder="Enter your address"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Display message */}
          {message && (
            <div className={`message ${message.type}`}>
              <p className="message">{message.text}</p>
            </div>
          )}

          {/* Additional Links */}
          <div className="register-links centered-text">
            <p className="paragraph">
              Already have an account?{" "}
              <NavLink to="/login" className="register-link">Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
