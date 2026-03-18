import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { markAttendance } from "../../services/api";
import "../styles/ScanQR.css";

function ScanQR() {
  const [message, setMessage] = useState("");
  const [scanned, setScanned] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Initialize QR scanner
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    // Success callback when QR is scanned
    const success = async (result) => {
      if (scanned) return; // Prevent double scanning
      setScanned(true);

      try {
        // Extract only the token from the QR URL
        const parts = result.split("/");
        const sessionToken = parts[parts.length - 1];

        // Call API to mark attendance
        const res = await markAttendance(sessionToken, token);

        setMessage(res.message || "✅ Attendance marked successfully!");
      } catch (err) {
        console.error(err);
        setMessage(err?.message || "⚠️ Failed to mark attendance");
      } finally {
        scanner.clear();
      }
    };

    // Error callback
    const error = (err) => {
      console.warn(err);
    };

    // Render scanner
    scanner.render(success, error);

    // Cleanup on unmount
    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanned, token]);

  return (
    <div className="scanner">
      <h2>Scan Attendance QR</h2>

      {message && <p className="message">{message}</p>}

      <div id="reader"></div>
    </div>
  );
}

export default ScanQR;