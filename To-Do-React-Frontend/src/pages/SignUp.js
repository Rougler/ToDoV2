import React, { useState } from "react";
import "../styles/SignUp.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBriefcase,
  FaLaptopCode,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    techStack: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/todo/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("data :", formData);

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="todo-content">
        <h1>Welcome to Our To-Do Application</h1>
        <p>
          Organize your tasks efficiently and boost your productivity. Sign up
          today to get started with managing your to-dos in a seamless way!
        </p>
      </div>
      <div className="form-wrapper">
        <p className="title">Welcome!</p>
        <p className="title">
          <span className="bold">Sign Up</span>
        </p>
        <p className="title">Please create an Account below</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              className="input"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              className="input"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input
              type="email"
              className="input"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-icon">
              <FaBriefcase />
            </div>
            <input
              type="text"
              className="input"
              placeholder="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-icon">
              <FaLaptopCode />
            </div>
            <input
              type="text"
              className="input"
              placeholder="Tech Stack"
              name="techStack"
              value={formData.techStack}
              onChange={handleInputChange}
            />
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="checkbox"
            />
            <label htmlFor="terms" className="checkbox-label">
              I agree to all{" "}
              <a href="/terms" className="link">
                terms and conditions
              </a>
              ,{" "}
              <a href="/privacy" className="link">
                Privacy policy
              </a>
            </label>
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
          <div className="login-option">
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
