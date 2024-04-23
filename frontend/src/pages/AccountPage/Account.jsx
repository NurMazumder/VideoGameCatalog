import React, { useState, useEffect } from "react";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../../components/Loading/Loading";
import "./Account.css";

const Account = ({ setAlert }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData(res.data);
        setFormValues(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please reload.");
        setLoading(false);
        console.error(err.response.data);
        setAlert("Failed to fetch data. Please reload.", "danger");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/users/me", formValues);
      setAlert("Profile Updated Successfully", "success");
      setUserData(res.data);
      setFormValues(res.data);
    } catch (err) {
      console.error(err.response.data);
      setAlert(
        "Error updating profile. Check console for more details.",
        "danger"
      );
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="account-container">
      <h1 className="account-header">Profile Management</h1>
      <div className="account-info">
        <h2>Current Profile Information</h2>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </div>
      <div className="account-update">
        <h2>Update Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <h3>Name:</h3>
            <input
              className="account-input"
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <h3>Email:</h3>
            <input
              className="account-input"
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <button className="account-button" type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

Account.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
});

export default connect(null, mapDispatchToProps)(Account);
