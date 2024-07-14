import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/todo/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          alert("Login successful!");
        } else {
          setError(data.error || "Login failed. Please try again.");
        }
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">Login</div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="username"
                className="input-field"
                required
                placeholder=" "
                value={formData.username}
                onChange={handleInputChange}
              />
              <label htmlFor="username" className="input-label">
                Username
              </label>
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                className="input-field"
                required
                placeholder=" "
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
            </div>
            <div className="options">
              <i>
                <a href="/signup" className="forgot-password">
                  SignUp
                </a>
              </i>
              <i>
                <a href="/forgot-password" className="forgot-password">
                  Forgot Password?
                </a>
              </i>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
