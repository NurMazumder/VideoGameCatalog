import React from "react";
import "./Auth.css";

const Login = () => {
  return (
    <div className="auth-background">
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form action="#">
          <div className="form-control">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="form-control">
            <input type="password" minLength="6" required />
            <label>Password</label>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't Have an Account? <a href="/Register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
