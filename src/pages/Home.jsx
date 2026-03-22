import Navbar from "../components/Navbar";
import "../styles/Home.css";
import ImageCarousel from "../components/ImageCarousel";
import {
  FaUserCheck,
  FaClock,
  FaShieldAlt,
  FaUserTie,
  FaQrcode,
  FaCamera,
  FaCheckCircle,
  FaUserShield,
  FaCheck,
  FaSmile,
} from "react-icons/fa";

const carouselImages = [
  "/imagefour.jpg",
  "/imageone.jpg",
  "/imagetwo.jpg",
  "/imagethree.jpg",
];

function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Carousel */}
        <section className="carousel-section">
          <ImageCarousel images={carouselImages} autoPlay interval={3000} />
        </section>

        {/* Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>University Digital Attendance System</h1>
            <p>
              A modern attendance tracking system using QR Code and Facial
              Recognition.
            </p>
            <button onClick={() => (window.location.href = "/login")}>
              Get Started
            </button>
          </div>
        </section>

        <section className="features">
          <div className="features-island">
            <h2>Key Features</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <FaQrcode className="icon" />
                <h3>QR Code Attendance</h3>
                <p>Quick and seamless check-in using QR codes.</p>
              </div>

              <div className="feature-card">
                <FaUserCheck className="icon" />
                <h3>Facial Recognition</h3>
                <p>Accurate identity verification for students.</p>
              </div>

              <div className="feature-card">
                <FaClock className="icon" />
                <h3>Real-time Tracking</h3>
                <p>Instant attendance updates and monitoring.</p>
              </div>

              <div className="feature-card">
                <FaShieldAlt className="icon" />
                <h3>Secure Data</h3>
                <p>Protected and reliable data storage system.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <FaUserTie className="icon" />
              <h3>Lecturer Creates Session</h3>
              <p>Set up a class session in seconds using the dashboard.</p>
            </div>
            <div className="step-card">
              <FaQrcode className="icon" />
              <h3>QR Code Generated</h3>
              <p>Automatic QR code is created for the students to scan.</p>
            </div>
            <div className="step-card">
              <FaCamera className="icon" />
              <h3>Students Scan / Face Verified</h3>
              <p>Students check-in using QR or facial recognition.</p>
            </div>
            <div className="step-card">
              <FaCheckCircle className="icon" />
              <h3>Attendance Recorded</h3>
              <p>Attendance is updated in real-time and secured.</p>
            </div>
          </div>
        </section>

        <section className="benefits">
          <h2>Why Use This System?</h2>
          <div className="benefit-grid">
            <div className="benefit-card">
              <FaClock className="icon" />
              <h3>Saves Time</h3>
              <p>Quick attendance recording without delays.</p>
            </div>
            <div className="benefit-card">
              <FaUserShield className="icon" />
              <h3>Prevents Proxy Attendance</h3>
              <p>Secure verification with QR and facial recognition.</p>
            </div>
            <div className="benefit-card">
              <FaCheck className="icon" />
              <h3>High Accuracy</h3>
              <p>Attendance data is reliable and precise.</p>
            </div>
            <div className="benefit-card">
              <FaSmile className="icon" />
              <h3>Easy to Use</h3>
              <p>Simple interface for students and lecturers alike.</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta-container">
            <h2>Start Tracking Attendance Smarter</h2>
            <p>
              Experience faster, secure, and accurate attendance tracking today.
            </p>
            <button onClick={() => (window.location.href = "/login")}>
              Get Started
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 Digital Attendance System</p>
        </footer>
      </main>
    </>
  );
}

export default Home;
