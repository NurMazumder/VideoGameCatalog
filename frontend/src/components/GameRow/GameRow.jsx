import React, { useState, useEffect } from "react";
import "./GameRow.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";

const GameRow = ({ id, setAlert }) => {
  const [game, setGame] = useState(null);

  // Get game data
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/id/${id}`);
        const gameData = await response.json();
        setGame(gameData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGame();
  }, [id]);

  // Remove game from wishlist
  const handleRemove = async () => {
    try {
      await axios.delete(`/api/wishlist/delete/${id}`);
      window.location.reload();
      setAlert("Game removed successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="game-row">
      {game && (
        <>
          <Link to={`/game/${id}`}>
            <div className="game-row-container">
              <img
                src={game.game_background_image}
                alt="Game Image"
                id="game-row-image"
              />
              <h4>{game.game_name}</h4>
              <p>Release Date: {game.game_released.substring(0, 10)}</p>
              <p>Genres: {game.game_genres && game.game_genres.join(", ")}</p>
              <p>
                Platforms:{" "}
                {game.game_platforms && game.game_platforms.join(", ")}
              </p>
            </div>
          </Link>
          <button id="remove-button" onClick={handleRemove}>
            Remove
          </button>
        </>
      )}
    </div>
  );
};

export default connect(null, { setAlert })(GameRow);
