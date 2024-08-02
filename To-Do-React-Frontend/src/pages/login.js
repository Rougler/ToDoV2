import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
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

      if (response.ok) {
        const data = await response.json();
        const url = new URL(data.url);
        const params = new URLSearchParams(url.search);
        const userInfo = {
          username: params.get("username"),
          email: params.get("email"),
          role: params.get("role"),
          designation: params.get("designation"),
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsAuthenticated(true);
        navigate("/", { state: { userInfo } });
      } else {
        const data = await response.json();
        setError(data.error || "Login failed. Please try again.");
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
