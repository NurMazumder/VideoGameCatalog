import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 10) {
      props.setAlert(
        "Error: The password must be at least 6 characters long.",
        "danger"
      );
    } else {
      console.log("SUCCESS");
    }
  };

  return (
    <div className="auth-background">
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-control">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
            <label>Name</label>
          </div>
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

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already Have an Account? <Link to="/Login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(Register);
