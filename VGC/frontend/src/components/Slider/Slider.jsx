import React from "react";
import "./Slider.css";
import GameCard from "../GameCard/GameCard";
import { Link } from "react-router-dom";

const Slider = (props) => {
  return (
    <div className="slider-container">
      <table className="slider-table">
        <thead>
          <tr>
            <th id="slider-header">{props.type}</th>
            <th colSpan="3"></th>
            <th id="view-link">
              <Link to="/search">View More</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.games &&
              props.games.map((game, index) => (
                <td key={index}>
                  <GameCard image={game.image} title={game.title} />
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Slider;
