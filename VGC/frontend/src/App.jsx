import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import GamePage from "./pages/GamePage/GamePage";
import "./App.css";
import "./components/auth/Auth.css";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* need  different path */}
            {/*<Route path="/" element={<MainPage gameList={gameList} />} /> */}
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
