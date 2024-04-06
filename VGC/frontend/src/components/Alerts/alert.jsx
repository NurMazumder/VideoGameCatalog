import React from "react";
import { connect } from "react-redux";
import "./alert.css";

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 && (
      <div className="alerts-container">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))}
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
