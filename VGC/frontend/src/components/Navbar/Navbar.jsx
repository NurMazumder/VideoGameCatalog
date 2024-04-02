import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">VGC</Link>
      </h1>
      <div className="navbar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
      <ul>
        <li>
          <Link to="/Games">Games</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
