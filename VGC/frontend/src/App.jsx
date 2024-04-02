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
import "./components/auth/Auth.css";
import { Provider } from "react-redux";
import store from "./store";
import gameList from "./games.json";
import Alert from "./components/Alerts/alert";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <section>
          <Alert />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<MainPage gameList={gameList} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
