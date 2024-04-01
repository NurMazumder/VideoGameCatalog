import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
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

export default Home;
