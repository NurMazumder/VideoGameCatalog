import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Slider from "../../components/Slider/Slider";
import GameInfoModal from "../../components/GameInfoModal/GameInfoModal";

const MainPage = ({ gameList }) => {
  // Displays the current game modal
  const [modalGame, setModalGame] = useState(null);
  // Use to navigate to different pages
  const navigate = useNavigate();
  // Open modal when game card is clicked
  const handleGameCardClick = (game) => {
    act(() => {
      setModalGame(game);
    });
  };
  // Close modal when modal background is clicked
  const handleModalClick = () => {
    setModalGame(null);
  };
  // Go to search page from main page
  const handleViewMoreClick = () => {
    navigate("/search");
  };
  return (
    <div className="home-page">
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
      <Slider
        type="Popular"
        games={gameList}
        onClick={handleGameCardClick}
        viewMore={handleViewMoreClick}
      />
      <Slider
        type="New Release"
        games={gameList}
        onClick={handleGameCardClick}
        viewMore={handleViewMoreClick}
      />
    </div>
  );
};

export default MainPage;
