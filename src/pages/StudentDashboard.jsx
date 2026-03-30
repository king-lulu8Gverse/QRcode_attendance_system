import { Link, Outlet } from "react-router-dom";
import { FaQrcode, FaHistory, FaUser } from "react-icons/fa";
import "../styles/StudentDashboard.css";
import React from "react";

function StudentDashboard() {
  return (
    <div className="student-dashboard">

      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Quick access to your attendance and profile</p>
      </div>

      <div className="dashboard-cards">
        <Link to="scan" className="card scan-card">
          <div className="card-icon"><FaQrcode /></div>
          <h3>Scan Attendance</h3>
          <p>Mark your attendance using QR code</p>
        </Link>

        <Link to="attendance-list" className="card history-card">
          <div className="card-icon"><FaHistory /></div>
          <h3>Attendance History</h3>
          <p>View all your attendance records</p>
        </Link>

        <Link to="profile" className="card profile-card">
          <div className="card-icon"><FaUser /></div>
          <h3>Profile</h3>
          <p>Manage your student profile</p>
        </Link>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>

    </div>
  );
}

export default StudentDashboard;