import React from "react";
import "../styles/navbartop.scss";
import secretSantLogo from "../images/SS-logo.png";
import { useAuthContext } from "../contexts/AuthProvider";
import Logout from "./Logout";
import JoinEvent from "./JoinEvent";

const NavBarTop = () => {
  const { userId } = useAuthContext();
  if (!userId) {
    return (
      <div className="navbartop">
        <div className="navbar-logo-container">
          <img
            className="ss-logo"
            alt="secret santa logo"
            src={secretSantLogo}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="navbartop">
      <div className="navbar-logo-container">
        <img className="ss-logo" alt="secret santa logo" src={secretSantLogo} />
      </div>
      {/* <div className="navbartop-render"> */}
      <ul className="navbartop-links">
        <li className="logout">
          <Logout className="navbartop-link-item" to="/" />
        </li>
        <li className="join-event">
          <JoinEvent className="navbar-link-item" to="/" />
        </li>
      </ul>
    </div>
    // </div>
  );
};
export default NavBarTop;
