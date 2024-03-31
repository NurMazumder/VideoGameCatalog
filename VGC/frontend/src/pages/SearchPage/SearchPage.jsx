import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import GameCard from "../../components/GameCard/GameCard";

const SearchPage = () => {
  const [gamesList, setGamesList] = useState([]);
  const [gameRows, setGameRows] = useState([]);
  const [filteredGamesList, setFilteredGamesList] = useState([]);
  // get list of games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`http://localhost:5030/api/games`);
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const json = await response.json();
        setGamesList(json);
        console.log(gamesList);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);
  // Organize games into rows of 4
  useEffect(() => {
    const organizeGamesToRows = () => {
      const rows = [];
      for (let i = 0; i < gamesList.length; i += 4) {
        rows.push(gamesList.slice(i, i + 4));
      }
      return rows;
    };
    setGameRows(organizeGamesToRows());
    console.log(gameRows);
  }, [gamesList]);
  return (
    <div className="page-container">
      <table className="page-table">
        <thead>
          <tr>
            <th id="page-header">Games Found: {gamesList.length}</th>
            <th colSpan="3"></th>
          </tr>
        </thead>
        <tbody>
          {gameRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((game, index) => (
                <td key={index}>
                  <GameCard
                    image={game.game_background_image}
                    title={game.game_name}
                    releaseDate={game.game_released}
                    id={game.rawg_id}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPage;
