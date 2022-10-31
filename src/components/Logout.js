import React, { useState } from "react";
import Alert from "./Alert";
import { useAuthContext } from "../contexts/AuthProvider";

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
      </button>
    </div>
  );
};

export default Logout;
