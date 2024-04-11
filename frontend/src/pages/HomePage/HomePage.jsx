import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="home">
      <div className="dark-overlay">
        <div className="home-inner">
          <h1 className="x-large">Video Game Catalog</h1>
          <p className="lead">
            Browse video games, leave reviews, and add to favorites
          </p>
          <div className="buttons">
            <Link to="/Register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/Login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
