import React, { useState, useEffect, useRef } from "react";
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
  const [filteredGamesList, setFilteredGamesList] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);
  const [isSelected, setIsSelected] = useState({
    genreSelected: false,
    platformSelected: false,
  });
  const searchPageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredGamesList.length / 40);
  const [pageInput, setPageInput] = useState(1);

  // Get list of games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        let url;
        if (query) {
          if (
            query === "popular" ||
            query === "newest" ||
            query === "action" ||
            query === "rpg" ||
            query === "shooter"
          ) {
            url = `/api/games/${query.replace(/\s+/g, "")}`;
          } else {
            url = `/api/games/search/name/${query}`;
          }
        } else {
          url = "/api/games";
        }
        const response = await fetch(url);
        const json = await response.json();
        setGamesList(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, [query]);

  // Fetch games based on genres
  const fetchFilteredGenre = async (selectedGenres) => {
    setIsLoading(true);
    if (selectedGenres.length !== 0) {
      setIsSelected({ ...isSelected, genreSelected: true });
      try {
        const response = await fetch(
          `/api/games/search/genre/${selectedGenres.join(" ")}`
        );
        const json = await response.json();
        const games = json.filter((data) =>
          gamesList.some((game) => game.rawg_id === data.rawg_id)
        );
        setFilteredGenres(games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    } else {
      setIsSelected({ ...isSelected, genreSelected: false });
      setFilteredGenres([]);
    }
  };

  // Fetch games based on platforms
  const fetchFilteredPlatform = async (selectedPlatforms) => {
    setIsLoading(true);
    if (selectedPlatforms.length !== 0) {
      setIsSelected({ ...isSelected, platformSelected: true });
      try {
        const response = await fetch(
          `/api/games/search/platform/${selectedPlatforms.join(" ")}`
        );
        const json = await response.json();
        const games = json.filter((data) =>
          gamesList.some((game) => game.rawg_id === data.rawg_id)
        );
        setFilteredPlatforms(games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    } else {
      setIsSelected({ ...isSelected, platformSelected: false });
      setFilteredPlatforms([]);
    }
  };

  // Filter games based on genres and platforms
  useEffect(() => {
    const filteredGames = () => {
      try {
        if (isSelected.genreSelected && isSelected.platformSelected) {
          // Both selections are selected
          const filteredGames = filteredGenres.filter((game1) => {
            return filteredPlatforms.some(
              (game2) => game1.rawg_id === game2.rawg_id
            );
          });
          setFilteredGamesList(filteredGames);
        } else if (!isSelected.genreSelected && !isSelected.platformSelected) {
          // No selections are made
          setFilteredGamesList(gamesList);
        } else if (!isSelected.genreSelected && isSelected.platformSelected) {
          // Only platform is selected
          setFilteredGamesList(filteredPlatforms);
        } else if (isSelected.genreSelected && !isSelected.platformSelected) {
          // Only genre is selected
          setFilteredGamesList(filteredGenres);
        }
      } catch (error) {
        console.log(error);
      }
    };
    filteredGames();
    setCurrentPage(1);
  }, [filteredGenres, filteredPlatforms, isSelected, gamesList]);

  // Organize games into rows of 4
  useEffect(() => {
    const organizeGamesToRows = () => {
      const rows = [];
      const start = (currentPage - 1) * 40;
      const end = Math.min(start + 40, filteredGamesList.length);
      for (let i = start; i < end; i += 4) {
        rows.push(filteredGamesList.slice(i, i + 4));
      }
      return rows;
    };
    setGameRows(organizeGamesToRows());
    setIsLoading(false);
  }, [filteredGamesList, currentPage]);
  /*
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
  }, [gamesList]);*/

  // Change the page
  const handlePageButton = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (searchPageRef.current) {
      searchPageRef.current.scrollTo(0, 0);
    }
  };

  // Change the page based on page input
  const handlePageSearch = (e) => {
    e.preventDefault();
    const inputValue = parseInt(pageInput);
    if (
      isNaN(inputValue) ||
      inputValue > totalPages ||
      inputValue < 1 ||
      inputValue === currentPage
    ) {
      alert("Invalid page input.");
      return;
    }
    setIsLoading(true);
    setCurrentPage(inputValue);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (searchPageRef.current) {
      searchPageRef.current.scrollTo(0, 0);
    }
  };

  return (
    <div className="page-container">
      <div className="search-side-container">
        <FilterPanel
          genreSelection={fetchFilteredGenre}
          platformSelection={fetchFilteredPlatform}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="search-page-container">
          <table className="search-table" ref={searchPageRef}>
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
          {totalPages === 1 ? null : (
            <div className="pagination">
              <h2>Games Found: {filteredGamesList.length}</h2>
              {totalPages < 10 ? (
                <div>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        className={`${
                          currentPage === pageNumber ? "selected" : ""
                        }`}
                        id="pagination-button"
                        key={pageNumber}
                        onClick={() => handlePageButton(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <h2>Current Page Number: {currentPage}</h2>
                  <form className="pagination-form" onSubmit={handlePageSearch}>
                    <input
                      id="page-input"
                      type="number"
                      value={pageInput}
                      placeholder="Enter page"
                      onChange={(e) => setPageInput(e.target.value)}
                    />
                    <button type="submit" id="pagination-button">
                      Go
                    </button>
                  </form>
                </div>
              )}
              <h2>Pages Found: {totalPages} </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
