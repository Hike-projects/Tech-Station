import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import "./AppStore.css"; // Newly designed CSS

function AppStore() {
  const [apps, setApps] = useState([]); // Store the list of apps
  const [status, setStatus] = useState("loading"); // Loading, success, error
  const [error, setError] = useState(null); // Error message if fetch fails

  // Fetch app data from Supabase
  useEffect(() => {
    async function fetchApps() {
      setStatus("loading");

      const { data, error } = await supabase.from("apps").select("*");

      if (error) {
        setError(`Error fetching apps: ${error.message}`);
        setStatus("error");
      } else {
        setApps(data); // Update state with fetched apps
        setStatus("success");
      }
    }
    fetchApps();
  }, []);

  // Render function for app cards
  const renderApps = () =>
    apps.map((app) => (
      <div key={app.id} className="app-card">
        <img src={app.icon_url} alt={`${app.name} Icon`} className="app-icon" />
        <div className="app-info">
          <h3 className="app-name">{app.name}</h3>
          <p className="app-description">{app.description}</p>
          <a href={app.download_url} className="download-button" download>
            Download
          </a>
        </div>
      </div>
    ));

  // Conditional rendering based on API status
  return (
    <div className="app-store">
      <h1 className="app-store-title">App Store</h1>

      {status === "loading" && <p className="loading-message">Loading apps...</p>}

      {status === "error" && <p className="error-message">{error}</p>}

      {status === "success" && (
        <div className="app-grid">
          {renderApps()} {/* Render apps once data is fetched */}
        </div>
      )}
    </div>
  );
}

export default AppStore;
