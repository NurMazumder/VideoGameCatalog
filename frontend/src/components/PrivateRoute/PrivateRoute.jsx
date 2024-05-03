import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  children,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/Login" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
