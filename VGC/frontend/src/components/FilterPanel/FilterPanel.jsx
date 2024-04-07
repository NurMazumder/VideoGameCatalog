import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = (props) => {
  const { genreList, platformList, genreSelection, platformSelection } = props;
  const [genreInput, setGenreInput] = useState([]);
  const [platformInput, setPlatformInput] = useState([]);

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
                  onClick={handleGenre}
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
                  onClick={handlePlatform}
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
