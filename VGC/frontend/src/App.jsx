import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import MainPage from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import GamePage from "./pages/GamePage/GamePage";
import "./components/Auth/Auth.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <section className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          {/*<Route path="/Main" element={<MainPage gameList={gameList} />} />*/}
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/Search/:query" element={<SearchPage />} />
          <Route path="/Game/:id" element={<GamePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
    </Router>
  );
};

export default App;
