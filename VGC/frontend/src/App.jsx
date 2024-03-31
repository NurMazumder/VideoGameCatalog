import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import GamePage from "./pages/GamePage/GamePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import gameList from "./games.json";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage gameList={gameList} />} />
          <Route path="/search" element={<SearchPage gameList={gameList} />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
