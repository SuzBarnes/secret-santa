import React from "react";
import "../styles/navbartop.scss";
import secretSantLogo from "../images/SS-logo.png";
import { useAuthContext } from "../contexts/AuthProvider";
import Login from "./Login";
import Logout from "./Logout";

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
        <ul className="navbartop-links">
          <li>
            <Login className="navbartop-link-item" to="/" />
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="navbartop">
      <div className="navbar-logo-container">
        <img className="ss-logo" alt="secret santa logo" src={secretSantLogo} />
      </div>
      <ul className="navbartop-links">
        <li>
          <Logout className="navbartop-link-item" to="/" />
        </li>
      </ul>
    </div>
  );
};
export default NavBarTop;
