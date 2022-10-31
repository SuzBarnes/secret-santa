import React from "react";
import "../styles/myevents.scss";
import { useAuthContext } from "../contexts/AuthProvider";
import Login from "./Login";

const MyEvents = () => {
  const { userId } = useAuthContext();

  if (!userId) {
    return (
      <div className="login-home">
        <Login className="login-form" to="/" />
      </div>
    );
  }

  return (
    <div className="my-events">
      <h1>My Events</h1>
    </div>
  );
};

export default MyEvents;
