import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LecturerDashboard from "./pages/LecturerDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CreateCourse from "./pages/lecturer/CreateCourse";
import StartSession from "./pages/lecturer/StartSession";
import AttendanceList from "./pages/lecturer/AttendanceList";
import ScanQR from "./pages/ScanQR";
import StudentAttendanceHistory from "./pages/StudentAttendanceHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/lecturer"
        element={
          <ProtectedRoute role="lecturer">
            <LecturerDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="start-session" element={<StartSession />} />
        <Route path="attendance-list/:sessionId" element={<AttendanceList />} />
      </Route>
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="scan" element={<ScanQR />} />
        <Route
          path="attendance-list"
          element={<StudentAttendanceHistory />}
        />
      </Route>
    </Routes>
  );
}

export default App;