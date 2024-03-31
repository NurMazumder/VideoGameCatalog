import React, {Fragment} from "react";
import Navbar from './components/layout/Navbar'
import Home from "./components/layout/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import GamePage from "./pages/GamePage/GamePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import gameList from "./games.json";

const App = () => {
  return (
  <Fragment>
  <Navbar />
  <Home />
  </Fragment>
  )
  /*
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage gameList={gameList} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  ); */
};

export default App;
