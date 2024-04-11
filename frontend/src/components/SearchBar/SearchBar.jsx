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
  // navigate to the search page
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/search/${searchInput}`);
    } else {
      console.log("Search Input is empty");
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
