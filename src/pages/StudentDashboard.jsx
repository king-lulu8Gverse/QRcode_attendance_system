import { Link, Outlet } from "react-router-dom";
import "../styles/StudentDashboard.css";
import React from "react";

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>

      <div className="dashboard-cards">
        <Link to="scan" className="card">
          Scan Attendance
        </Link>

        <Link to="attendance-list" className="card">
          Attendance History
        </Link>

        <Link to="profile" className="card">
          Profile
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default StudentDashboard;