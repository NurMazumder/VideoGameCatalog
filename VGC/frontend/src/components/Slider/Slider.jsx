import React from "react";
import "./Slider.css";
import GameCard from "../GameCard/GameCard";

const Slider = (props) => {
  const { onClick } = props;
  const { viewMore } = props;
  return (
    <div className="slider-container">
      <table className="slider-table">
        <thead>
          <tr>
            <th id="slider-header">{props.type}</th>
            <th colSpan="4"></th>
            <th onClick={viewMore} id="view-link">
              View More
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.games &&
              props.games.map((game, index) => (
                <td key={index}>
                  <GameCard
                    image={game.image}
                    title={game.title}
                    description={game.description}
                    releaseDate={game.releaseDate}
                    price={game.price}
                    onClick={() => onClick(game)}
                  />
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Slider;
