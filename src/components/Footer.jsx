import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-island">

        <div className="footer-container">

         
          <div className="footer-section">
            <h3 className="brand">TechTendance</h3>
            <p>
              Smart university attendance system using QR code and facial recognition.
            </p>
          </div>

          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <p onClick={() => window.location.href="/"}>Home</p>
            <p onClick={() => window.location.href="/login"}>Login</p>
          </div>

      
          <div className="footer-section">
            <h4>Creator</h4>
            <p> king-lulu8Gverse
              @CodewithReedah
            </p>
            <p>Final Year Project</p>
          </div>

        
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="socials">
              <FaGithub />
              <FaLinkedin />
              <FaEnvelope />
            </div>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 TechTendance. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;