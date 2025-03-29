import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import "./AppStore.css";

function AppStore() {
  const [apps, setApps] = useState([]); // App data state
  const [status, setStatus] = useState("loading"); // Track loading, success, or error states
  const [error, setError] = useState(null); // Handle errors

  // Fetch App Data from Supabase
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

  // Function to handle download clicks and update download counts
  const handleDownload = async (appId, downloadUrl) => {
    try {
      console.log("Attempting to update downloads for app ID:", appId);

      // Fetch the current download count
      const { data, error: fetchError } = await supabase
        .from("apps")
        .select("downloads")
        .eq("id", appId)
        .single();

      if (fetchError) {
        console.error("Error fetching current downloads:", fetchError);
        alert("Error fetching app downloads. Please try again later.");
        return; // Stop further execution
      }

      const currentDownloads = data.downloads || 0;
      const updatedDownloads = currentDownloads + 1;

      // Update the downloads column
      const { error: updateError } = await supabase
        .from("apps")
        .update({ downloads: updatedDownloads })
        .eq("id", appId);

      if (updateError) {
        console.error("Error updating downloads:", updateError);
        alert("Error updating the download count. Please try again later.");
        return; // Stop further execution
      } else {
        console.log(`Successfully updated downloads for app ID ${appId}`);
      }

      // Redirect to the download link
      console.log("Redirecting to URL:", downloadUrl);
      window.location.href = downloadUrl;
    } catch (err) {
      console.error("Unexpected error handling download:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  // Function to render each app’s card
  const renderApps = () =>
    apps.map((app) => (
      <div key={app.id} className="app-card">
        {/* App Icon */}
        <img src={app.icon_url} alt={`${app.name} Icon`} className="app-icon" />

        {/* App Info */}
        <div className="app-info">
          <h3 className="app-name">{app.name}</h3>
          <p className="app-description">{app.description}</p>

          {/* Download Button with Count */}
          <div className="download-section">
            <button
              className="download-button"
              onClick={() => handleDownload(app.id, app.download_url)} // Call handleDownload directly
            >
              📥 Download ({app.downloads || 0}) {/* Default to 0 if null */}
            </button>
          </div>
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

        {/* Loading State */}
        {status === "loading" && <p className="loading-message">Loading apps...</p>}

        {/* Error State */}
        {status === "error" && <p className="error-message">{error}</p>}

        {/* Success State */}
        {status === "success" && <div className="app-grid">{renderApps()}</div>}
      </div>

      {/* Include Footer */}
      <Footer />
    </div>
  );
}

export default AppStore;
