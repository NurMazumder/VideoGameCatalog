import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = (props) => {
  const { genreList, platformList } = props;
  return (
    <div className="panel-container">
      {genreList && (
        <fieldset>
          <legend>Genres</legend>
          <ul>
            {genreList.map((genre, index) => (
              <div className="checkbox-selector" key={index}>
                <input type="checkbox" id={`genre-${index}`} />
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
                <input type="checkbox" id={`platform-${index}`} />
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
