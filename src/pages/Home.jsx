import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home">
        <div className="hero-content">
          <h1>University Digital Attendance System</h1>
          <p>
            A modern attendance tracking system using QR Code and Facial Recognition.
          </p>
          <button onClick={() => window.location.href="/login"}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;