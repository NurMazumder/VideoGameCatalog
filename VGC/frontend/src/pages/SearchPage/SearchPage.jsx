import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { useParams } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Loading from "../../components/Loading/Loading";
import { param } from "express-validator";

const SearchPage = () => {
  const { query } = useParams();
  const [gamesList, setGamesList] = useState([]);
  const [gameRows, setGameRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [filteredGamesList, setFilteredGamesList] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);

  // Get list of games
  useEffect(() => {
    const fetchGames = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const json = await response.json();
        setGamesList(json);
        setFilteredGamesList(json);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    if (query) {
      fetchGames(`http://localhost:5030/api/games/search/name/${query}`);
    } else {
      fetchGames("http://localhost:5030/api/games");
    }
  }, [query]);

  // Fetch games based on genres
  const fetchFilteredGenre = async (selectedGenres) => {
    setIsLoading(true);
    if (selectedGenres.length !== 0) {
      try {
        const response = await fetch(
          `http://localhost:5030/api/games/search/genre/${selectedGenres.join(
            " "
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const json = await response.json();
        setFilteredGenres(json);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    } else {
      setFilteredGenres([]);
    }
  };

  // Fetch games based on platforms
  const fetchFilteredPlatform = async (selectedPlatforms) => {
    setIsLoading(true);
    if (selectedPlatforms.length !== 0) {
      try {
        const response = await fetch(
          `http://localhost:5030/api/games/search/platform/${selectedPlatforms.join(
            " "
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const json = await response.json();
        setFilteredPlatforms(json);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    } else {
      setFilteredPlatforms([]);
    }
  };

  // Filter games based on genres and platforms
  useEffect(() => {
    const updateFilteredGames = () => {
      if (filteredGenres.length === 0 && filteredPlatforms.length === 0) {
        setFilteredGamesList(gamesList);
      } else if (filteredGenres.length > 0 && filteredPlatforms.length > 0) {
        const filteredGames = filteredGenres.filter((game1) => {
          return filteredPlatforms.some(
            (game2) => game1.rawg_id === game2.rawg_id
          );
        });
        setFilteredGamesList(filteredGames);
      } else if (filteredGenres.length > 0) {
        setFilteredGamesList(filteredGenres);
      } else {
        setFilteredGamesList(filteredPlatforms);
      }
    };
    updateFilteredGames();
  }, [filteredGenres, filteredPlatforms]);

  // Organize games into rows of 4
  useEffect(() => {
    const organizeGamesToRows = () => {
      const rows = [];
      const games = filteredGamesList;
      for (let i = 0; i < games.length; i += 4) {
        rows.push(games.slice(i, i + 4));
      }
      return rows;
    };
    setIsLoading(false);
    setGameRows(organizeGamesToRows());
  }, [gamesList, filteredGamesList]);

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
        <FilterPanel
          genreList={genres}
          platformList={platforms}
          genreSelection={fetchFilteredGenre}
          platformSelection={fetchFilteredPlatform}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="search-page-container">
          <table className="search-table">
            <thead>
              <tr>
                <th id="search-header">
                  Games Found: {filteredGamesList.length}
                </th>
                <th colSpan="3"></th>
              </tr>
            </thead>
            <tbody>
              {gameRows &&
                gameRows.map((row, rowIndex) => (
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
