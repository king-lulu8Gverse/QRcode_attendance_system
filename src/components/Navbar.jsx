import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pages } from "../data/views";
import "../styles/NavBar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="brand">TechTendance</div>

        
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {pages.map((page) => (
            <li key={page.name}>
              <Link to={page.path} onClick={() => setIsOpen(false)}>
                {page.name}
              </Link>
            </li>
          ))}
        </ul>

   
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div className={`line ${isOpen ? "rotate1" : ""}`}></div>
          <div className={`line ${isOpen ? "fade" : ""}`}></div>
          <div className={`line ${isOpen ? "rotate2" : ""}`}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;