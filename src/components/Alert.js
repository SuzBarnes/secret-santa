import React from "react";
import "../styles/alert.scss";
import PropTypes from "prop-types";

const Alert = ({ message, isSuccess }) => {
  if (!message) {
    return null;
  }
  return (
    <div className={`alert alert-${isSuccess ? "success" : "error"}`}>
      {message}
    </div>
  );
};

Alert.defaultProps = {
  isSuccess: false,
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool,
};

export default Alert;
