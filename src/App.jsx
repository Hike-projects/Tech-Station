import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px" }}>
        {/* A simple navigation bar */}
        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={<h1>About Page - Customize this page!</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
