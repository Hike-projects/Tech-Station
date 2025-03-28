import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppStore from "./pages/appstore/AppStore"; // Import AppStore component

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Homepage (App Store) */}
        <Route path="/" element={<AppStore />} />
      </Routes>
    </Router>
  );
}

export default App;
