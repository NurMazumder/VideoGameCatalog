import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
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
    console.log(formData);

    const newUser = {
      name,
      email,
      password,
    };

    try {
      const config = {
        headers: {
          // Changed "Headers" to "headers"
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(newUser);
      const res = await axios.post(
        "http://localhost:5030/api/users",
        body,
        config
      );
      console.log(res.data); // This will now log the response from your server, including the token if successful.
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Register;
