import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import GameCard from "../../components/GameCard/GameCard";
import GameInfoModal from "../../components/GameInfoModal/GameInfoModal";

const SearchPage = ({ gameList }) => {
  const [modalGame, setModalGame] = useState(null);
  // Open modal when game card is clicked
  const handleGameCardClick = (game) => {
    setModalGame(game);
  };
  // Close modal when modal background is clicked
  const handleModalClick = () => {
    setModalGame(null);
  };
  const gameRows = gameList.reduce((rows, game, index) => {
    if (index % 5 === 0) {
      rows.push([]);
    }
    rows[rows.length - 1].push(game);
    return rows;
  }, []);
  return (
    <div className="page-container">
      {modalGame && (
        <GameInfoModal
          image={modalGame.image}
          title={modalGame.title}
          description={modalGame.description}
          releaseDate={modalGame.releaseDate}
          price={modalGame.price}
          onClick={handleModalClick}
        />
      )}
      <table className="page-table">
        <thead>
          <tr>
            <th id="page-header">Games Found:</th>
            <th colSpan="5"></th>
          </tr>
        </thead>
        <tbody>
          {gameRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((game, index) => (
                <td key={index}>
                  <GameCard
                    image={game.image}
                    title={game.title}
                    description={game.description}
                    releaseDate={game.releaseDate}
                    price={game.price}
                    onClick={() => handleGameCardClick(game)}
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
