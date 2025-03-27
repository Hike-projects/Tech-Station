import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

import "./AppStore.css"; // Create styles for the app store layout

function AppStore() {
  const [apps, setApps] = useState([]);    // Store the list of apps
  const [status, setStatus] = useState(""); // Status for loading, error
  const [error, setError] = useState(null); // Error message if needed

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

  // Render function for each app
  const renderApps = () =>
    apps.map((app) => (
      <div key={app.id} className="app-card">
        <img src={app.icon_url} alt={`${app.name} Icon`} className="app-icon" />
        <h3 className="app-name">{app.name}</h3>
        <p className="app-description">{app.description}</p>
        <a href={app.download_url} className="download-button" download>
          Download
        </a>
      </div>
    ));

  return (
    <div className="app-store">
      <h1>App Store</h1>
      {status === "loading" && <p>Loading apps...</p>}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
      {status === "success" && (
        <div className="app-grid">
          {renderApps()} {/* Render apps from state */}
        </div>
      )}
    </div>
  );
}

export default AppStore;
