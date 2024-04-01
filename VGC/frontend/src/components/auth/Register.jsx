import React from "react";

const Register = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Register;
