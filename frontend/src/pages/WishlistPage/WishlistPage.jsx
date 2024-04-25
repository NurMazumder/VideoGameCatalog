import React, { useState, useEffect } from "react";
import GameCard from "../../components/GameCard/GameCard";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5030/api/wishlist/retrieve", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        const wishlistData = await response.json();
        setWishlist(wishlistData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching wishlist: {error}</div>;
  }

  return (
    <div>
      <h2>Wishlist</h2>
      <div className="game-card-container">
        {wishlist.map((gameId) => (
          <GameCardWrapper key={gameId} gameId={gameId} />
        ))}
      </div>
    </div>
  );
};

const GameCardWrapper = ({ gameId }) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:5030/api/games/${gameId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch game");
        }
        const gameData = await response.json();
        setGame(gameData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [gameId]);

  if (loading) {
    return <div>Loading game...</div>;
  }

  if (error) {
    return <div>Error fetching game: {error}</div>;
  }

  return (
    <GameCard
      image={game.game_background_image}
      title={game.game_name}
      releaseDate={game.game_released}
      id={game.rawg_id}
    />
  );
};

export default WishlistPage;