import React, { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();

  // update input text
  const handleInput = (event) => {
    setSearchInput(event.target.value);
  };

  // Navigate to the search page
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/search/${searchInput}`);
    } else {
      return;
    }
    setSearchInput("");
  };

  return (
    <form className="search-container" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for games"
        value={searchInput}
        onChange={handleInput}
      />
      <button type="submit" id="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
