import axios from "axios";

const API = axios.create({
  baseURL: "https://qrcode-server-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------- AUTH ---------------- */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = async (data) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/login", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/* ---------------- COURSES ---------------- */

export const createCourse = async (data, token) => {
  try {
    const res = await API.post("/courses", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getCourses = async (token) => {
  try {
    const res = await API.get("/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const startSession = async (course_id, token) => {
  try {
    const res = await API.post(
      `/sessions/start/${course_id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/* ---------------- MARK ATTENDANCE ---------------- */

export const markAttendance = async (sessionToken, token) => {
  try {
    const res = await API.post(
      `/attendance/${sessionToken}`, 
      {}, 
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
/* ---------------- VIEW ATTENDANCE ---------------- */
//fetch the attendance for a specific session
export const getAttendance = async (session_id, token) => {
  try {
    const res = await API.get(`/attendance/${session_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

//Get the attendance history for lecturer

export const getLecturerAttendance = async (token) => {
  try {
    const res = await API.get(`/attendance/lecturer`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
// Fetch all sessions attended by the student
export const getStudentAttendance = async (token) => {
  try {
    const res = await API.get("/attendance/student", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

