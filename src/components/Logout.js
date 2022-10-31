import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";
import { useAuthContext } from "../contexts/AuthProvider";
import "../styles/logout.scss";

const Logout = () => {
  const initialState = {
    alert: {
      message: "",
      isSuccess: false,
    },
  };
  const { setUserId } = useAuthContext();
  const [alert, setAlert] = useState(initialState.alert);
  const logoutClick = () => {
    localStorage.clear();
    setUserId("");
    setAlert({
      message: "You have successfully logged out",
      isSuccess: true,
    });
  };
  return (
    <div className="logout">
      <Alert message={alert.message} success={alert.isSuccess} />
      <button type="submit" onClick={logoutClick}>
        Logout
        <FontAwesomeIcon icon={faRightToBracket} className="font-awesome" />
      </button>
    </div>
  );
};

export default Logout;
