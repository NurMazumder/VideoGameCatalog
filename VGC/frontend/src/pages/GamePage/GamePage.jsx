import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Gamepage.css";

const GamePage = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  // fetch game details from the backend
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(
          `http://localhost:5030/api/videogames/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch game");
        }
        const json = await response.json();
        setGameDetails(json);
        console.log(gameDetails);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };
    fetchGame();
  }, [id]);

  return (
    <>
      {gameDetails ? (
        <div className="game-container">
          <div className="game-image-container">
            <img
              src={gameDetails.backgroundImage}
              alt="Game Image"
              id="game-image"
            />
          </div>
          <div className="info-container">
            <div className="side-container">
              <h2>{gameDetails.name}</h2>
              <p>Release Date: {gameDetails.released.substring(0, 10)}</p>
              <p>Price: </p>
              <p>
                Developers:{" "}
                {gameDetails.developers
                  .map((developer) => developer.name)
                  .join(", ")}
              </p>
              <p>
                Platforms:{" "}
                {gameDetails.platforms
                  .map((platform) => platform.name)
                  .join(", ")}
              </p>
            </div>
            <div className="game-description-container">
              <p>{gameDetails.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="error-container">
          <h2>Opps, the game was not found</h2>
          <Link to="/">Head back to website</Link>
        </div>
      )}
    </>
  );
};

export default GamePage;
