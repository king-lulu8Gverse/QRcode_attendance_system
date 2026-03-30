import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSessionAttendance } from "../../../services/api";
import "../../styles/AttendanceDetails.css";
import { FaDownload } from "react-icons/fa";

function AttendanceDetails({ token }) {
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getSessionAttendance(id, token);
      setStudents(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadCSV = () => {
    const csv = [
      ["Name", "Matric", "Department", "Faculty"],
      ...students.map((s) => [
        s.name,
        s.matric_number,
        s.department,
        s.faculty,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
  };

  return (
    <div className="attendance-details">

      <div className="details-header">
        <h2>Attendance List</h2>

        <button onClick={downloadCSV} className="download-btn">
          <FaDownload /> Download
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Matric</th>
            <th>Department</th>
            <th>Faculty</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.matric_number}</td>
              <td>{s.department}</td>
              <td>{s.faculty}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AttendanceDetails;