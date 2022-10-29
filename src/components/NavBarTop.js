import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbartop.scss";
import secretSantLogo from "../images/SS-logo.png";

const NavBarTop = () => {
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
