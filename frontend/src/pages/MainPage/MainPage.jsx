import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider/Slider";

const MainPage = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [newGames, setNewGames] = useState([]);

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await fetch(
          "http://localhost:5030/api/games/popular?count=10"
        );
        const json = await response.json();
        setPopularGames(json);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    const fetchNewGames = async () => {
      try {
        const response = await fetch(
          "http://localhost:5030/api/games/newrelease?count=10"
        );
        const json = await response.json();
        setNewGames(json);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchPopularGames();
    fetchNewGames();
  }, []);
  return (
    <div className="home-page">
      <Slider type="Popular" games={popularGames} />
      <Slider type="New Release" games={newGames} />
    </div>
  );
};

export default MainPage;
