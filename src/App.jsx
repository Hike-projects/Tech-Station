import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import AppStore from "./pages/appstore/AppStore"; // Import AppStore component

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/about" style={{ marginRight: "10px" }}>About</Link>
        <Link to="/appstore">App Store</Link> {/* App Store Link */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About Page - Customize This!</h1>} />
        <Route path="/appstore" element={<AppStore />} /> {/* App Store Route */}
      </Routes>
    </Router>
  );
}

export default App;
