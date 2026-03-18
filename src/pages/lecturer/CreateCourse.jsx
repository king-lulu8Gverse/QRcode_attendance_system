import { useState } from "react";
import { createCourse } from "../../../services/api"; 
import "../../styles/CreateCourse.css";

function CreateCourse() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await createCourse({
        course_name: name,
        course_code: code,
      });

      if (res.message) {
        setMessage("✅ Course created successfully!");
      } else {
        setMessage("⚠️ Could not create course");
      }

      setName("");
      setCode("");
    } catch (err) {
      setMessage(err?.message || "⚠️ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course">
      <h2>Create Course</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreateCourse;