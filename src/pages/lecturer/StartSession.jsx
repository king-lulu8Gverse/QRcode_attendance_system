import { useState, useEffect } from "react";
import { startSession, getCourses } from "../../../services/api";
import { QRCodeCanvas } from "qrcode.react";
import "../../styles/StartSession.css";

function StartSession() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [sessionUUID, setSessionUUID] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses(token);

        setCourses(res.data || res);
      } catch (err) {
        console.error(err);
        setMessage("⚠️ Failed to load courses");
      }
    };

    fetchCourses();
  }, [token]);

  const startAttendance = async () => {
    if (!courseId) {
      setMessage("⚠️ Please select a course");
      return;
    }

    setLoading(true);
    setMessage("");
    setSessionUUID("");

    try {
      const res = await startSession(courseId, token);

      if (res.session_token) {
        setSessionUUID(res.qrImage);
        setMessage("✅ Session started successfully!");
      } else {
        setMessage("⚠️ Failed to start session");
      }
    } catch (err) {
      console.error(err);
      setMessage(err?.message || "⚠️ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="session-page">
      <h2>Start Attendance</h2>

      <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
        <option value="">Select Course</option>

        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.course_name} ({course.course_code})
          </option>
        ))}
      </select>

      <button onClick={startAttendance} disabled={loading}>
        {loading ? "Generating..." : "Generate QR"}
      </button>

      {message && <p className="message">{message}</p>}

      {sessionUUID && (
        <div className="qr-container">
          <img src={sessionUUID} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default StartSession;
