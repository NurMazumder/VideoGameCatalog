import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GamePage.css";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const GamePage = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:5030/api/games/${id}`);
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

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("JWT token:", token);
      const response = await fetch("http://localhost:5030/api/wishlist/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify({ gameId: id })
      });
      if (!response.ok) {
        throw new Error("Failed to add game to wishlist");
      }
      alert("Game added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding game to wishlist:", error);
      alert("Failed to add game to wishlist");
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading-contaainer">
          <div className="loading-spinner"></div>
        </div>
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
              <p>Release Date: {gameDetails.game_released}</p>
              <p>Price: </p>
              <p>
                Platforms:{" "}
                {gameDetails.platforms
                  .map((platform) => platform.name)
                  .join(", ")}
              </p>
              <button
                style={{ marginTop: "100px" }}
                onClick={handleAddToWishlist}
              >
                Add Current Game to Wishlist
              </button>
            </div>
            <div className="game-description-container">
              <p>{gameDetails.description}</p>
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