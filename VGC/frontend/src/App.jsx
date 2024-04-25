import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import MainPage from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import GamePage from "./pages/GamePage/GamePage";
import WishlistPage from "./pages/WishlistPage/WishlistPage"; // Import WishlistPage
import "./components/auth/Auth.css";
import { Provider } from "react-redux";
import store from "./store";
import gameList from "./games.json";
import Alert from "./components/Alerts/alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./actions/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
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
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
};

export default App;