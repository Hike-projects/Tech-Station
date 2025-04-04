import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./GameStore.css";

function GameStore() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        setStatus("loading");
        const { data, error } = await supabase.from("games").select("*");

        if (error) {
          console.error("Error fetching games:", error);
          setError(`Error fetching games: ${error.message}`);
          setStatus("error");
        } else {
          setGames(data);
          setFilteredGames(data); // Initialize filtered games with all games
          setStatus("success");
        }
      } catch (err) {
        console.error("Unexpected error fetching games:", err);
        setError("An unexpected error occurred while fetching games.");
        setStatus("error");
      }
    }

    fetchGames();
  }, []);

  const handleSearch = (query) => {
    const filtered = games.filter(
      (game) =>
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        game.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const handleDownload = async (gameId, downloadUrl) => {
    try {
      console.log("Updating downloads for game ID:", gameId);

      const { data, error: fetchError } = await supabase
        .from("games")
        .select("downloads")
        .eq("id", gameId)
        .single();

      if (fetchError) {
        console.error("Error fetching downloads:", fetchError);
        alert("Error fetching game downloads. Please try again later.");
        return;
      }

      const updatedDownloads = (data.downloads || 0) + 1;

      const { error: updateError } = await supabase
        .from("games")
        .update({ downloads: updatedDownloads })
        .eq("id", gameId);

      if (updateError) {
        console.error("Error updating downloads:", updateError);
        alert("Error updating download count. Please try again later.");
        return;
      }

      window.location.href = downloadUrl;
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const renderGames = () =>
    filteredGames.map((game) => (
      <div key={game.id} className="game-card">
        <img src={game.icon_url} alt={`${game.name} Icon`} className="game-icon" />
        <div className="game-info">
          <h3 className="game-name">{game.name}</h3>
          <p className="game-description">{game.description}</p>
          <div className="download-section">
            <button
              className="download-button"
              onClick={() => handleDownload(game.id, game.download_url)}
            >
              🎮 Download ({game.downloads || 0})
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="game-container">
      <div className="game-store">
        {/* Use the SearchBar component */}
        <SearchBar onSearch={handleSearch} />
        {status === "loading" && <p className="loading-message">Loading games...</p>}
        {status === "error" && <p className="error-message">{error}</p>}
        {status === "success" && (
          <div className="game-grid">
            {filteredGames.length > 0 ? (
              renderGames()
            ) : (
              <p className="no-results">No games found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameStore;