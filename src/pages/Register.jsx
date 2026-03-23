import React, { useState } from "react";
import { registerUser } from "../../services/api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaBuilding,
  FaBook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "../styles/Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    matric_number: "",
    department: "",
    faculty: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const res = await registerUser(form);

      if (res.message || res.success) {
        alert("Registered Successfully!");
        setForm({
          name: "",
          email: "",
          password: "",
          role: "student",
          matric_number: "",
          department: "",
          faculty: "",
        });
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="register-page">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </button>

      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join TechTendance</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
          </select>

          {form.role === "student" && (
            <>
              <div className="input-group">
                <FaIdCard className="input-icon" />
                <input
                  name="matric_number"
                  placeholder="Matric Number"
                  value={form.matric_number}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <FaBuilding className="input-icon" />
                <input
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <FaBook className="input-icon" />
                <input
                  name="faculty"
                  placeholder="Faculty"
                  value={form.faculty}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => (window.location.href = "/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;