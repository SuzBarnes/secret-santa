import React, { useState } from "react";

const Logout = () => {
  const initialState = {
    alert: {
      message: "",
      isSuccess: false,
    },
  };
  const [alert, setAlert] = useState(initialState.alert);
  const logoutClick = () => {
    localStorage.clear();
    setAlert({
      message: "You have successfully logged out",
      isSuccess: true,
    });
  };

  return (
    <div className="logout">
      <button type="submit" onClick={logoutClick}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
