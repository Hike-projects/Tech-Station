import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import "../../App.css";
import reactLogo from "../../assets/react.svg"; // Adjust relative path
import viteLogo from "/vite.svg"; // Correct import for vite.svg

function Home() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(""); // Status: 'loading', 'updating', 'success', or 'error'
  const [error, setError] = useState("");

  // Fetch the initial counter value on component mount
  useEffect(() => {
    async function fetchInitialCount() {
      setStatus("loading");
      const { data, error } = await supabase
        .from("counter")
        .select("count")
        .eq("id", 1)
        .single();

      if (error) {
        setError(`Error fetching initial count: ${error.message}`);
        setStatus("error");
      } else {
        setCount(data.count);
        setStatus("success");
      }
    }

    fetchInitialCount();
  }, []);

  // Handle counter update on button click
  const handleClick = async () => {
    const newCount = count + 1;
    // Optimistically update the UI
    setCount(newCount);
    setStatus("updating");

    const { error: updateError } = await supabase
      .from("counter")
      .update({ count: newCount })
      .eq("id", 1);

    if (updateError) {
      setError(`Error updating count: ${updateError.message}`);
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Supabase</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <p>
          Edit <code>src/Home.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Status and Error Message Display */}
      {status === "loading" && <p>Loading current count...</p>}
      {status === "updating" && <p>Updating count...</p>}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default Home;
