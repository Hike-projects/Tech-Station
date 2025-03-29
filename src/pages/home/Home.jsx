import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import AppStore from "../appstore/AppStore";
import GameStore from "../gamestore/GameStore";
import "./Home.css";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("apps");

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <NavBar />

      {/* Category Switcher */}
      <div className="category-tabs">
        <button
          className={activeCategory === "apps" ? "active-tab" : ""}
          onClick={() => setActiveCategory("apps")}
        >
          Apps
        </button>
        <button
          className={activeCategory === "games" ? "active-tab" : ""}
          onClick={() => setActiveCategory("games")}
        >
          Games
        </button>
      </div>

      {/* Content Area */}
      <div className="content-container">
        {activeCategory === "apps" && <AppStore showLayout={false} />}
        {activeCategory === "games" && <GameStore showLayout={false} />}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;