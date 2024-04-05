import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { useParams } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Loading from "../../components/Loading/Loading";

const SearchPage = () => {
  const { query } = useParams();
  const [gamesList, setGamesList] = useState([]);
  const [gameRows, setGameRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [filteredGamesList, setFilteredGamesList] = useState([]);
  const [filterInput, setFilterInput] = useState([]);

  // get list of games
  useEffect(() => {
    const fetchGames = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const json = await response.json();
        setGamesList(json);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    if (query) {
      fetchGames(`http://localhost:5030/api/games/search/${query}`);
    } else {
      fetchGames("http://localhost:5030/api/games");
    }
  }, [query]);

  // Organize games into rows of 4
  useEffect(() => {
    const organizeGamesToRows = () => {
      const rows = [];
      for (let i = 0; i < gamesList.length; i += 4) {
        rows.push(gamesList.slice(i, i + 4));
      }
      return rows;
    };
    setIsLoading(false);
    setGameRows(organizeGamesToRows());
  }, [gamesList]);
  // Get genres and platforms of the game list
  useEffect(() => {
    const populateGameData = () => {
      const genreMap = {};
      const platformMap = {};
      gamesList.forEach((game) => {
        game.game_genres?.forEach((genre) => {
          genreMap[genre] = true;
        });
        game.game_platforms?.forEach((platform) => {
          platformMap[platform] = true;
        });
      });
      setGenres(Object.keys(genreMap));
      setPlatforms(Object.keys(platformMap));
    };
    populateGameData();
  }, [gamesList]);

  return (
    <div className="page-container">
      <div className="search-side-container">
        <FilterPanel genreList={genres} platformList={platforms} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="search-page-container">
          <table className="search-table">
            <thead>
              <tr>
                <th id="search-header">Games Found: {gamesList.length}</th>
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
      )}
    </div>
  );
};

export default SearchPage;
