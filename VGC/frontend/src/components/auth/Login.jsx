import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Success");
  };

  return (
    <div className="auth-background">
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <label>Email</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              name="password"
              required
            />
            <label>Password</label>
          </div>

          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't Have an Account? <Link to="/Register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
