import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom"; // Updated import
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const navigate = useNavigate(); // Using useNavigate hook

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  {
    /*if (isAuthenticated) {
    navigate("/search"); // Programmatically navigate using navigate
    return null; // Prevent further rendering
  }*/
  }

  return (
    <div className="auth-background">
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              minLength="6"
              value={password}
              onChange={onChange}
              name="password"
              required
            />
            <label>Password</label>
          </div>

          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't Have an Account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
