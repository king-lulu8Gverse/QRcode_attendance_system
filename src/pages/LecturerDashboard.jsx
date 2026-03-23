import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBook, FaPlayCircle, FaListAlt, FaCog, FaChartBar, FaUserGraduate } from "react-icons/fa";
import "../styles/LecturerDashboard.css";
import { getDashboardStats } from "../../services/api"; // API call for stats

function LecturerDashboard() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    ongoingSessions: 0,
    totalStudents: 0,
    avgAttendance: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await getDashboardStats();
        setStats(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="lecturer-dashboard">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <h2>TechTendance</h2>
        <nav>
          <Link to="create-course"><FaBook /> Create Course</Link>
          <Link to="start-session"><FaPlayCircle /> Start Session</Link>
          <Link to="attendance-list"><FaListAlt /> View Attendance</Link>
          <Link to="reports"><FaChartBar /> Reports</Link>
          <Link to="students"><FaUserGraduate /> Students</Link>
          <Link to="settings"><FaCog /> Settings</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, Lecturer</h1>
        </header>

        {/* STATS CARDS */}
        <section className="dashboard-cards">
          <div className="card futuristic">
            <FaBook className="card-icon" />
            <h3>Total Courses</h3>
            <p>{stats.totalCourses}</p>
          </div>

          <div className="card futuristic">
            <FaPlayCircle className="card-icon" />
            <h3>Ongoing Sessions</h3>
            <p>{stats.ongoingSessions}</p>
          </div>

          <div className="card futuristic">
            <FaUserGraduate className="card-icon" />
            <h3>Total Students</h3>
            <p>{stats.totalStudents}</p>
          </div>

          <div className="card futuristic">
            <FaChartBar className="card-icon" />
            <h3>Average Attendance</h3>
            <p>{stats.avgAttendance}%</p>
          </div>
        </section>

        {/* ACTION CARDS */}
        <section className="action-cards">
          <Link to="create-course" className="card futuristic action-card">
            <h3>Create New Course</h3>
            <p>Setup a new course with details and students</p>
          </Link>

          <Link to="start-session" className="card futuristic action-card">
            <h3>Start Attendance Session</h3>
            <p>Generate QR code and start taking attendance</p>
          </Link>

          <Link to="attendance-list" className="card futuristic action-card">
            <h3>View Attendance</h3>
            <p>Check student attendance per session</p>
          </Link>
        </section>

        {/* Placeholder for Charts */}
        <section className="charts-section">
          <h2>Attendance Trends</h2>
          <div className="chart-placeholder">
            <p>Chart goes here</p>
          </div>
        </section>

        <Outlet />
      </main>
    </div>
  );
}

export default LecturerDashboard;