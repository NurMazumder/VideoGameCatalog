import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const navigate = useNavigate();

  // Handle logout and navigation
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/myGames">myGames</Link>
      </li>
      <li>
        {/* Updated logout link to call handleLogout function */}
        <a href="#!" onClick={handleLogout}>
          Logout
        </a>
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
        <Link to={isAuthenticated ? "/search" : "/"}>VGC</Link>
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
