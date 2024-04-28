import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const handleLogout = () => {
    logout();
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/Wishlist">Wishlist</Link>
      </li>
      <li>
        <Link to="/Account">Account</Link>
      </li>
      <li>
        <Link to="/" onClick={handleLogout}>
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
        <Link to={isAuthenticated ? "/main" : "/"}>VGC</Link>
      </h1>
      <SearchBar />
      {!loading && (isAuthenticated ? authLinks : visitorLinks)}
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
