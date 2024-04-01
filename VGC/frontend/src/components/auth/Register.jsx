import React from "react";
import "./Auth.css";

const Register = () => {
  return (
    <div className="auth-background">
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <form action="#">
          <div className="form-control">
            <input type="text" required />
            <label>Name</label>
          </div>
          <div className="form-control">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="form-control">
            <input type="password" minLength="6" required />
            <label>Password</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already Have an Account? <a href="/Login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
