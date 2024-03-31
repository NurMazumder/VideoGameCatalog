import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html">VGC</a>
      </h1>
      <div className="navbar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
        ></input>
        <button type="submit" className="search-btn">
          Search
        </button>
      </div>
      <ul>
        <li>
          <a href="profiles.html">Games</a>
        </li>
        <li>
          <a href="register.html">Register</a>
        </li>
        <li>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
