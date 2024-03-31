import React from "react";
import "./GameCard.css";

const GameCard = (props) => {
  const { onClick } = props;
  const isValidImage =
    props.image && typeof props.image === "string" && props.image.trim() !== "";
  return (
    <div className="card-container" onClick={onClick} data-testid="game-card">
      {isValidImage ? (
        <img src={props.image} alt="Game Image" id="game-card-image" />
      ) : (
        <p>Error Processing Image</p>
      )}
      <div className="description-container">
        <h4 id="game-title">{props.title}</h4>
        <p id="game-description">{props.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
