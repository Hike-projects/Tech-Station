import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AppStore
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          <li>
            <Link to="/appstore" className="navbar-link">
              App Store
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
