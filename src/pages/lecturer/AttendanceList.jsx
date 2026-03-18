import { useEffect, useState } from "react";
import { getCourses, getAttendance } from "../../../services/api";
import "../../styles/AttendanceList.css";

function AttendanceList() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch courses on load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data || []);
      } catch (err) {
        setError(err?.message || "Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setAttendance([]);
    setMessage("");
    setError("");
    if (!courseId) return;

    setLoading(true);
    try {
      const res = await getAttendance(courseId); // fetch attendance for selected course
      if (res.data?.length) {
        setAttendance(res.data);
      } else {
        setMessage("No attendance recorded for this session.");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance List</h2>

      {/* Course selector */}
      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">Select a Course/Session</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.course_name} ({c.course_code})
          </option>
        ))}
      </select>

      {/* Messages */}
      {loading && <p className="message">Loading attendance...</p>}
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}

      {/* Attendance table */}
      {attendance.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Matric Number</th>
              <th>Department</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((s) => (
              <tr key={s.id}>
                <td data-label="Name">{s.name}</td>
                <td data-label="Matric Number">{s.matric_number}</td>
                <td data-label="Department">{s.department}</td>
                <td data-label="Time">
                  {new Date(s.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceList;