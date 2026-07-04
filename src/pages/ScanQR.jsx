import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/ScanQR.css";
import Webcam from "react-webcam";
import { useRef } from "react";
import { loadFaceModels, getFaceDescriptor } from "../utils/faceRecongition";
import { verifyFace, markAttendance} from "../../services/api";
// import { isOnline } from "../database/network";
// import { saveOfflineAttendance } from "../database/offlineAttendance";
function ScanQR() {
  const [message, setMessage] = useState("");
  const [scanned, setScanned] = useState(false);
  const token = localStorage.getItem("token");
  const webcamRef = useRef(null);
 const scannerRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [faceDescriptor, setFaceDescriptor] = useState(null);

  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    loadFaceModels();
  }, []);
  useEffect(() => {
    const config = {
      fps: 10, // faster scanning
      qrbox: { width: 300, height: 300 },

      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
      facingMode: { exact: "environment" },
    };
    scannerRef.current = new Html5QrcodeScanner(
    "reader",
    config,
    false
);
    const success = async (result) => {
      if (scanned) return;
      setScanned(true);

      try {
        const parts = result.split("/");
        const sessionToken = parts[parts.length - 1];
        await scannerRef.current.clear();
        setSessionToken(sessionToken);
        setShowCamera(true);
        setMessage("QR Code scanned. Please verify your face.");
      } catch (err) {
        console.error(err);
        setMessage(err?.message || "⚠️ Failed to mark attendance");
      }
    };

   const error = (err) => {
    if (!err.includes("NotFoundException")) {
        console.warn(err);
    }
};

   scannerRef.current.render(success, error);

    return () => {
      scannerRef.current.clear().catch(() => {});
    };
  }, []);
  const verifyStudentFace = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    const img = new Image();
    img.src = imageSrc;

    img.onload = async () => {
      const descriptor = await getFaceDescriptor(img);

      if (!descriptor) {
        setMessage("❌ No face detected.");
        return;
      }

      try {
        // Verify face first
        const verify = await verifyFace(descriptor, token);

        if (!verify.success) {
          setMessage("❌ Face verification failed.");
          return;
        }

        // If face matches, mark attendance
        const attendance = await markAttendance(sessionToken, token);

        setMessage(attendance.message);

        setShowCamera(false);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Verification failed.");
      }
    };
  };
  return (
    <div className="scanner-container">
      <div className="scanner-overlay">
        <h2>Scan QR Code</h2>

        {message && <p className="scanner-message">{message}</p>}

        {!showCamera && <div id="reader" className="scanner-box"></div>}

        {showCamera && (
          <div className="face-verification">
            <h3>Face Verification</h3>

            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
            />

            <button onClick={verifyStudentFace} className="camera-btn">
              Verify Face
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScanQR;
