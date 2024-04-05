import React from "react";
import Slider from "../../components/Slider/Slider";

const MainPage = ({ gameList }) => {
  return (
    <div className="home-page">
      <Slider type="Popular" games={gameList} />
      <Slider type="New Release" games={gameList} />
    </div>
  );
};

export default MainPage;
