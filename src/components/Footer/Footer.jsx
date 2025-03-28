import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© 2025 AppStore. All Rights Reserved.</p>
        <div className="footer-icons">
          {/* Social Media Icons */}
          <a href="#" className="footer-icon">🌐</a> {/* Website */}
          <a href="#" className="footer-icon">📱</a> {/* Mobile */}
          <a href="#" className="footer-icon">📧</a> {/* Email */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;