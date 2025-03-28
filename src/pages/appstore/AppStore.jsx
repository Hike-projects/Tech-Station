import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import NavBar from "../../components/NavBar/NavBar"; // Import NavBar Component
import Footer from "../../components/Footer/Footer"; // Import Footer Component
import "./AppStore.css"; // Import AppStore styles

function AppStore() {
  const [apps, setApps] = useState([]); // App data state
  const [status, setStatus] = useState("loading"); // Loading, success, or error
  const [error, setError] = useState(null); // For error handling

  // Fetch App Data from Supabase
  useEffect(() => {
    async function fetchApps() {
      setStatus("loading");
      const { data, error } = await supabase.from("apps").select("*");
      if (error) {
        setError(`Error fetching apps: ${error.message}`);
        setStatus("error");
      } else {
        setApps(data);
        setStatus("success");
      }
    }
    fetchApps();
  }, []);

  // Renders App Cards
  const renderApps = () =>
    apps.map((app) => (
      <div key={app.id} className="app-card">
        <img src={app.icon_url} alt={`${app.name} Icon`} className="app-icon" />
        <div className="app-info">
          <h3 className="app-name">{app.name}</h3>
          <p className="app-description">{app.description}</p>
          <a href={app.download_url} className="download-button" download>
            📥 Download
          </a>
        </div>
      </div>
    ));

  return (
    <div className="app-container">
      {/* Include Navigation Bar */}
      <NavBar />

      {/* App Store Main Content */}
      <div className="app-store">
        <h1 className="app-store-title">App Store</h1>
        {status === "loading" && <p className="loading-message">Loading apps...</p>}
        {status === "error" && <p className="error-message">{error}</p>}
        {status === "success" && <div className="app-grid">{renderApps()}</div>}
      </div>

      {/* Include Footer */}
      <Footer />
    </div>
  );
}

export default AppStore;