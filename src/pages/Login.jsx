import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        if (res.role === "lecturer") navigate("/lecturer");
        if (res.role === "student") navigate("/student");
      } else {
        setError(res.message || "Invalid login");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed, check your credentials.");
    }
  };

  return (
    <div className="login-page">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </button>

      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to TechTendance</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;