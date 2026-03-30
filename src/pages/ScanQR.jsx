import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { markAttendance } from "../../services/api";
import "../styles/ScanQR.css";

function ScanQR() {
  const [message, setMessage] = useState("");
  const [scanned, setScanned] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const config = {
      fps: 10, // faster scanning
      qrbox: { width: 300, height: 300 },
      
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
      facingMode: { exact: "environment" },
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);

    const success = async (result) => {
      if (scanned) return;
      setScanned(true);

      try {
        const parts = result.split("/");
        const sessionToken = parts[parts.length - 1];

        const res = await markAttendance(sessionToken, token);
        setMessage(res.message || "✅ Attendance marked successfully!");
      } catch (err) {
        console.error(err);
        setMessage(err?.message || "⚠️ Failed to mark attendance");
      } finally {
        scanner.clear();
      }
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanned, token]);

  return (
    <div className="scanner-container">
      <div className="scanner-overlay">
        <h2>Scan QR Code</h2>
        {message && <p className="scanner-message">{message}</p>}
        <div id="reader" className="scanner-box"></div>
      </div>
    </div>
  );
}

export default ScanQR;