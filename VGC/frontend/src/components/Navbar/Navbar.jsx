import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/myGames">myGames</Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          Logout
        </Link>
      </li>
    </ul>
  );

  const visitorLinks = (
    <ul>
      <li>
        <Link to="/Register">Register</Link>
      </li>
      <li>
        <Link to="/Login">Login</Link>
      </li>
    </ul>
  );

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
      {!loading && <> {isAuthenticated ? authLinks : visitorLinks}</>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
