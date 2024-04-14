import React, { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate(); // Use navigate hook

  // update input text
  const handleInput = (event) => {
    setSearchInput(event.target.value);
  };

  // Navigate to the search page
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/search/${searchInput}`);
    } else {
      return;
    }
    setSearchInput("");
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for games"
        value={searchInput}
        onChange={handleInput}
      />
      <button type="submit" id="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
