import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./AppStore.css";

function AppStore() {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        setStatus("loading");
        const { data, error } = await supabase.from("apps").select("*");

        if (error) {
          console.error("Error fetching apps:", error);
          setError(`Error fetching apps: ${error.message}`);
          setStatus("error");
        } else {
          setApps(data);
          setFilteredApps(data); // Initialize filtered apps with all apps
          setStatus("success");
        }
      } catch (err) {
        console.error("Unexpected error fetching apps:", err);
        setError("An unexpected error occurred while fetching apps.");
        setStatus("error");
      }
    }

    fetchApps();
  }, []);

  const handleSearch = (query) => {
    const filtered = apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredApps(filtered);
  };

  const handleDownload = async (appId, downloadUrl) => {
    try {
      console.log("Attempting to update downloads for app ID:", appId);

      const { data, error: fetchError } = await supabase
        .from("apps")
        .select("downloads")
        .eq("id", appId)
        .single();

      if (fetchError) {
        console.error("Error fetching current downloads:", fetchError);
        alert("Error fetching app downloads. Please try again later.");
        return;
      }

      const updatedDownloads = (data.downloads || 0) + 1;

      const { error: updateError } = await supabase
        .from("apps")
        .update({ downloads: updatedDownloads })
        .eq("id", appId);

      if (updateError) {
        console.error("Error updating downloads:", updateError);
        alert("Error updating the download count. Please try again later.");
        return;
      }

      window.location.href = downloadUrl;
    } catch (err) {
      console.error("Unexpected error handling download:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const renderApps = () =>
    filteredApps.map((app) => (
      <div key={app.id} className="app-card">
        <img src={app.icon_url} alt={`${app.name} Icon`} className="app-icon" />
        <div className="app-info">
          <h3 className="app-name">{app.name}</h3>
          <p className="app-description">{app.description}</p>
          <div className="download-section">
            <button
              className="download-button"
              onClick={() => handleDownload(app.id, app.download_url)}
            >
              📥 Download ({app.downloads || 0})
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="app-container">
      <div className="app-store">
        {/* Use the SearchBar component */}
        <SearchBar onSearch={handleSearch} />
        {status === "loading" && <p className="loading-message">Loading apps...</p>}
        {status === "error" && <p className="error-message">{error}</p>}
        {status === "success" && (
          <div className="app-grid">
            {filteredApps.length > 0 ? (
              renderApps()
            ) : (
              <p className="no-results">No apps found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppStore;