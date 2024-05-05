import React from "react";
import "./NotFoundPage.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h2>Thanks for visiting the site but the page doesn't exist.</h2>
      <Link to="/main" id="home-link">
        Head back to our main page.
      </Link>
    </div>
  );
};

export default NotFoundPage;
