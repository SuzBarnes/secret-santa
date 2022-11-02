import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const logoutClick = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUserId("");
    setAlert({
      message: "You have successfully logged out",
      isSuccess: true,
    });
    navigate("/");
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
