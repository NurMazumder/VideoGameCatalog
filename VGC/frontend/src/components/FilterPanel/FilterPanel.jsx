import React, { useState, useEffect } from "react";
import "./FilterPanel.css";
import { useLocation } from "react-router-dom";

const FilterPanel = (props) => {
  const { genreList, platformList, genreSelection, platformSelection } = props;
  const [genreInput, setGenreInput] = useState([]);
  const [platformInput, setPlatformInput] = useState([]);
  const location = useLocation();

  // Handle genre checkbox inputs
  const handleGenre = (event) => {
    let updatedGenre;
    if (event.target.checked) {
      updatedGenre = [...genreInput, event.target.value];
    } else {
      updatedGenre = genreInput.filter((genre) => genre !== event.target.value);
    }
    setGenreInput(updatedGenre);
    genreSelection(updatedGenre);
  };

  // Handle platform checkbox inputs
  const handlePlatform = (event) => {
    let updatedPlatforms;
    if (event.target.checked) {
      updatedPlatforms = [...platformInput, event.target.value];
    } else {
      updatedPlatforms = platformInput.filter(
        (platform) => platform !== event.target.value
      );
    }
    setPlatformInput(updatedPlatforms);
    platformSelection(updatedPlatforms);
  };

  // Clear selections
  useEffect(() => {
    const resetSelections = () => {
      setGenreInput([]);
      setPlatformInput([]);
    };
    if (location.pathname.includes("/search/")) {
      resetSelections();
    }
  }, [location.pathname]);

  return (
    <div className="panel-container">
      {genreList && (
        <fieldset>
          <legend>Genres</legend>
          <ul>
            {genreList.map((genre, index) => (
              <div className="checkbox-selector" key={index}>
                <input
                  type="checkbox"
                  value={genre}
                  id={`genre-${index}`}
                  onChange={handleGenre}
                  checked={genreInput.includes(genre)}
                />
                <label htmlFor={`genre-${index}`}>{genre}</label>
              </div>
            ))}
          </ul>
        </fieldset>
      )}
      {platformList && (
        <fieldset>
          <legend>Platforms</legend>
          <ul>
            {platformList.map((platform, index) => (
              <div className="checkbox-selector" key={index}>
                <input
                  type="checkbox"
                  value={platform}
                  id={`platform-${index}`}
                  onChange={handlePlatform}
                  checked={platformInput.includes(platform)}
                />
                <label htmlFor={`platform-${index}`}>{platform}</label>
              </div>
            ))}
          </ul>
        </fieldset>
      )}
    </div>
  );
};

export default FilterPanel;
