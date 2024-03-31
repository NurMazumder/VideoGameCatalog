import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div id="vgc-icon"></div>
      <div id="vgc-title"></div>
      <div className="account-container">
        <div id="account-icon"></div>
      </div>
    </div>
  );
};

export default Navbar;
