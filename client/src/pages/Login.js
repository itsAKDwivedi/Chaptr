import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import for v6

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before submitting

    try {
      const response = await axios.post("https://chaptr-mg42.onrender.com/api/v1/auth/login", { email, password });
      const { data } = response;

      if (data.success) {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        // Redirect to home or dashboard page after successful login
        navigate("/dashboard"); // Example: change this to your desired route
      } else {
        setError(data.message); // Show error message
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="login-page-container">
        <div className="login-card fadeIn">
          <h1 className="login-title centered-text">Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="login-form-group">
              <label htmlFor="email" className="login-form-label paragraph">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="login-form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="login-form-group">
              <label htmlFor="password" className="login-form-label paragraph">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="login-form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Submit Button */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Additional Links */}
          <div className="login-links centered-text">
            <a href="/forgot-password" className="login-link">
              Forgot Password?
            </a>
            <a href="/register" className="login-link">
              Create an Account
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
