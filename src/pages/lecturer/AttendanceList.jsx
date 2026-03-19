import { useEffect, useState } from "react";
import { getCourses, getLecturerAttendance } from "../../../services/api";
import "../../styles/AttendanceList.css";

function AttendanceList({ token }) {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch courses & lecturer attendance on load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const [coursesRes, sessionsRes] = await Promise.all([
          getCourses(token),
          getLecturerAttendance(token),
        ]);

        const allCourses = coursesRes.data || [];
        const allSessions = sessionsRes || [];

        setCourses(allCourses);
        setSessions(allSessions);
        setFilteredSessions(allSessions);

        if (!allSessions.length) setMessage("No attendance history found.");
      } catch (err) {
        setError(err?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Handle course filtering
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);

    if (!courseId) {
      setFilteredSessions(sessions);
    } else {
      const filtered = sessions.filter((s) => s.course.id === String(courseId));
      setFilteredSessions(filtered);
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance History</h2>

      {/* Course selector */}
      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">All Courses/Sessions</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.code || c.course_code})
          </option>
        ))}
      </select>

      {/* Messages */}
      {loading && <p className="message">Loading attendance...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filteredSessions.length === 0 && (
        <p className="message">{message || "No sessions found."}</p>
      )}

      {/* Sessions & attendance table */}
      {filteredSessions.length > 0 &&
        filteredSessions.map((session) => (
          <div key={session._id || session.id} className="session-block">
            <h3>
              {session.course.name} -{" "}
              {new Date(session.date).toLocaleDateString()}
            </h3>

            {session.attendees.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Matric Number</th>
                    <th>Department</th>
                    <th>Faculty</th>
                  </tr>
                </thead>
                <tbody>
                  {session.attendees.map((att, index) => {
                    const student = att.student || att;

                    return (
                      <tr key={student.matric_number || index}>
                        <td>{student.name || "N/A"}</td>
                        <td>{student.matric_number || "N/A"}</td>
                        <td>{student.department || "N/A"}</td>
                        <td>{student.faculty || "N/A"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No students attended this session.</p>
            )}
          </div>
        ))}
    </div>
  );
}

export default AttendanceList;
