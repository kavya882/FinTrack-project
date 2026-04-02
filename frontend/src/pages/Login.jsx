import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { User, Lock } from "lucide-react";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post("/auth/login", loginData);

      const token = response.data.token;

      localStorage.setItem("token", token);

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {

      console.error("Login error:", error);

      if (error.response) {
        alert(error.response.data.message || "Invalid credentials");
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to manage your finances</p>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <User size={20} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <Lock size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="auth-link">
          Don't have an account? 
          <span onClick={() => navigate("/register")}>Create one</span>
        </div>
      </div>
    </div>
  );
}

export default Login;