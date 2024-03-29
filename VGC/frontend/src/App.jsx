import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import gameList from "./games.json";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage gameList={gameList} />} />
          <Route path="/search" element={<SearchPage gameList={gameList} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
