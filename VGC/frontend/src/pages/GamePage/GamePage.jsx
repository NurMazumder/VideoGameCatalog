import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Gamepage.css";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Loading from "../../components/Loading/Loading";

const GamePage = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // fetch game details from the backend
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(
          `http://localhost:5030/api/games/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch game");
        }
        const json = await response.json();
        setGameDetails(json);
      } catch (error) {
        console.error("Error fetching game:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : gameDetails ? (
        <div className="game-container">
          <div className="game-image-container">
            <img
              src={gameDetails.game_background_image}
              alt="Game Image"
              id="game-image"
            />
          </div>
          <div className="info-container">
            <div className="side-container">
              <p>{gameDetails.game_name}</p>
              <p>Release Date: {gameDetails.game_released.substring(0, 10)}</p>
              <p>
                Genres:{" "}
                {gameDetails.game_genres.map((genre) => genre).join(", ")}
              </p>
              {/*<p>
                Developers:{" "}
                {gameDetails.developers
                  .map((developer) => developer.name)
                  .join(", ")}
                </p>*/}
              <p>
                Platforms:{" "}
                {gameDetails.game_platforms
                  .map((platform) => platform)
                  .join(", ")}
              </p>
              <p>
                Tags: {gameDetails.game_tags.map((tags) => tags).join(", ")}
              </p>
            </div>
            <div className="game-description-container">
              <p>{gameDetails.game_description}</p>
            </div>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default GamePage;
