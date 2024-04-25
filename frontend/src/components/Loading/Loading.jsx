import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container" data-testid="loading">
      <div className="loading-spinner"></div>
    </div>
  );
};
export default Loading;
