import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider/Slider";

const MainPage = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [actionGames, setActionGames] = useState([]);
  const [rpgGames, setRPGGames] = useState([]);
  const [shooterGames, setShooterGames] = useState([]);

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await fetch("/api/games/popular?count=10");
        const json = await response.json();
        setPopularGames(json);
      } catch (error) {
        console.error("Error fetching popular games:", error);
      }
    };
    const fetchNewGames = async () => {
      try {
        const response = await fetch("/api/games/newrelease?count=10");
        const json = await response.json();
        setNewGames(json);
      } catch (error) {
        console.error("Error fetching new games:", error);
      }
    };
    const fetchActionGames = async () => {
      try {
        const response = await fetch("/api/games/action?count=10");
        const json = await response.json();
        setActionGames(json);
      } catch (error) {
        console.error("Error fetching action games:", error);
      }
    };
    const fetchRPGGames = async () => {
      try {
        const response = await fetch("/api/games/rpg?count=10");
        const json = await response.json();
        setRPGGames(json);
      } catch (error) {
        console.error("Error fetching rpg games:", error);
      }
    };
    const fetchShooterGames = async () => {
      try {
        const response = await fetch("/api/games/shooter?count=10");
        const json = await response.json();
        setShooterGames(json);
      } catch (error) {
        console.error("Error fetching shooter games:", error);
      }
    };
    fetchPopularGames();
    fetchNewGames();
    fetchActionGames();
    fetchRPGGames();
    fetchShooterGames();
  }, []);

  return (
    <div className="home-page">
      <div>
        <Slider type="Popular" games={popularGames} />
        <Slider type="New Release" games={newGames} />
        <Slider type="Action" games={actionGames} />
        <Slider type="RPG" games={rpgGames} />
        <Slider type="Shooter" games={shooterGames} />
      </div>
    </div>
  );
};

export default MainPage;
