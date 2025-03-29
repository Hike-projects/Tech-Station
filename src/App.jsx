import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AppStore from "./pages/appstore/AppStore";
import GameStore from "./pages/gamestore/GameStore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<AppStore />} />
        <Route path="/games" element={<GameStore />} />
      </Routes>
    </Router>
  );
}

export default App;