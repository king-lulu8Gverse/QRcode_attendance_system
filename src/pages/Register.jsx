import { useState } from "react";
import { registerUser } from "../../services/api"; // Use your API service
import "../styles/Register.css";
import React from "react";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("Name, Email, and Password are required!");
    }

    try {
      const res = await registerUser(form); // Use the API service
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
        alert("Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Registration Failed");
    }
  };

  return (
    <>
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>

        {form.role === "student" && (
          <>
            <input
              name="matric_number"
              placeholder="Matric Number"
              value={form.matric_number}
              onChange={handleChange}
            />
            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
            />
            <input
              name="faculty"
              placeholder="Faculty"
              value={form.faculty}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
    </>
  );
}

export default Register;