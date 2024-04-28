import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GamePage.css";
import Review from "../../components/Review/Review";
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
        const response = await fetch(`/api/games/id/${id}`);
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
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ gameId: id }),
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
        <Loading />
      ) : gameDetails ? (
        <div className="game-details-container">
          <div className="side-info-container">
            <p>{gameDetails.game_name}</p>
            <p>Release Date: {gameDetails.game_released.substring(0, 10)}</p>
            <p>
              Genres: {gameDetails.game_genres.map((genre) => genre).join(", ")}
            </p>
            <p>
              Platforms:{" "}
              {gameDetails.game_platforms
                .map((platform) => platform)
                .join(", ")}
            </p>
            <p>Tags: {gameDetails.game_tags.join(", ")}</p>
          </div>
          <div className="info-container">
            <div className="game-image-container">
              <img
                src={gameDetails.game_background_image}
                alt="Game Image"
                id="game-image"
              />
            </div>
            <div className="game-description-container">
              <p>{gameDetails.game_description}</p>
            </div>
          </div>
          <div className="review-container">
            <button id="wishlist-button" onClick={handleAddToWishlist}>
              Add to wishlist
            </button>
            <Review gameId={id} />
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default GamePage;
