import React from "react";
import "./GameCard.css";
import { Link } from "react-router-dom";

const GameCard = (props) => {
  const isValidImage =
    props.image && typeof props.image === "string" && props.image.trim() !== "";
  return (
    <Link to={`/game/${props.id}`}>
      <div className="card-container" data-testid="game-card">
        {isValidImage ? (
          <img src={props.image} alt="Game Image" id="game-card-image" />
        ) : (
          <p>Error Processing Image</p>
        )}
        <div className="description-container">
          <h4 id="game-title">{props.title}</h4>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
