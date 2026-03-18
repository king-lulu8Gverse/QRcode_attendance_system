import { useEffect, useState } from "react";
import { getAttendance } from "../../services/api";
import "../styles/StudentAttendanceHistory.css"; // CSS file we made
import React from "react";

function StudentAttendanceHistory() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError("");
      setMessage("");

      try {
        const res = await getAttendance("student"); // token auto-attached
        if (res.data?.length) {
          setAttendance(res.data);
        } else {
          setMessage("No attendance records yet.");
        }
      } catch (err) {
        setError(err?.message || "Failed to fetch attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <p className="message">Loading your attendance...</p>;
  if (error) return <p className="error">{error}</p>;
  if (message) return <p className="message">{message}</p>;

  return (
    <div className="attendance-container">
      <h2>Your Attendance History</h2>

      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a) => (
            <tr key={a.id}>
              <td data-label="Course">{a.course_name}</td>
              <td data-label="Date & Time">
                {new Date(a.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendanceHistory;