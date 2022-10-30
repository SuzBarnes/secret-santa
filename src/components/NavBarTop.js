import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbartop.scss";
import secretSantLogo from "../images/SS-logo.png";
import Logout from "./Logout";

const NavBarTop = () => {
  const [loggedIn, setLoggedIn] = useState(!localStorage.access);

  if (loggedIn) {
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
            <Link className="navbartop-link-item" to="/">
              <Logout />
            </Link>
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
          <Link className="navbartop-link-item" to="login">
            Login
          </Link>
        </li>
        <li>
          <Link className="navbartop-link-item" to="register">
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBarTop;
