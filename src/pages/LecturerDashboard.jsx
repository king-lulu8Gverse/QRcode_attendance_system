import "../styles/LecturerDashboard.css";
import { Link, Outlet } from "react-router-dom";
import React from "react";

function LecturerDashboard() {
  return (
    <div className="lecturer-dashboard">
      <h1>Lecturer Dashboard</h1>

      <div className="dashboard-cards">
        <Link to="create-course" className="card">
          Create Course
        </Link>

        <Link to="start-session" className="card">
          Start Attendance Session
        </Link>

        <Link to="attendance-list" className="card">
          View Attendance
        </Link>
      </div>

      {/* Nested routes will render here */}
      <Outlet />
    </div>
  );
}

export default LecturerDashboard;
