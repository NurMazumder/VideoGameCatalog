import React from "react";
import "./GameInfoModal.css";

const GameInfoModal = (props) => {
  const { onClick } = props;
  return (
    <div className="modal-container">
      <div className="modal-header-container">
        <button id="modal-close-button" onClick={onClick}>
          x
        </button>
      </div>
      <div className="modal-image-container">
        <img src={props.image} alt="Game Image" id="modal-game-image" />
      </div>
      <div className="modal-info-container">
        <div className="modal-side-container">
          <h2>{props.title}</h2>
          <p>Release Date: {props.releaseDate}</p>
          <p>Price: {props.price}</p>
        </div>
        <div className="modal-description-container">
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GameInfoModal;
