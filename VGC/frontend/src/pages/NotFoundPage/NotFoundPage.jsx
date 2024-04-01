import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-white text-2xl">
      <h2>Thanks for visiting the site but the page doesn't exist.</h2>
      <Link to="/" className="hover:cursor:pointer">
        Head back to our main page.
      </Link>
    </div>
  );
};

export default NotFoundPage;
