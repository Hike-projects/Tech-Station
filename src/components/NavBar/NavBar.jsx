import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AppStore
        </Link>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="navbar-link">
              🏠 {/* Home icon */}
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">
              ℹ️ {/* About icon */}
            </Link>
          </li>
          <li>
            <Link to="/appstore" className="navbar-link">
              📦 {/* App Store icon */}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;