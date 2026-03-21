import { useEffect, useState } from "react";
import { getStudentAttendance } from "../../services/api";
import "../styles/StudentAttendanceHistory.css";
import React from "react";

function StudentAttendanceHistory({ token }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError("");
      setMessage("");

      try {
        const data = await getStudentAttendance(token);

        if (data.length) {
          setSessions(data);
        } else {
          setMessage("No attendance records yet.");
        }
      } catch (err) {
        setError(err?.message || "Failed to fetch attendance history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  if (loading) return <p className="message">Loading your attendance...</p>;
  if (error) return <p className="error">{error}</p>;
  if (message) return <p className="message">{message}</p>;

  return (
    <div className="attendance-container">
      <h2>Your Attendance History</h2>

      {sessions.map((session) => (
        <div key={session.id} className="session-block">
          <h3>
            {session.course_name} -{" "}
            {new Date(session.date).toLocaleDateString()}
          </h3>

          <p>
            Time:{" "}
            {session.start_time
              ? new Date(session.start_time).toLocaleTimeString()
              : "N/A"}
          </p>

          <p>
            Status: <span style={{ color: "green" }}>Present ✅</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default StudentAttendanceHistory;