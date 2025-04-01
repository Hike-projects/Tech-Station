import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleInputChange}
      className="search-input"
    />
  );
};

export default SearchBar;