import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbartop.scss";
import secretSantLogo from "../images/SantaDrawsLogo.png";
import { useAuthContext } from "../contexts/AuthProvider";
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
      </div>
    );
  }
  return (
    <div className="navbartop">
      <div className="navbar-logo-container">
        <img className="ss-logo" alt="secret santa logo" src={secretSantLogo} />
      </div>
      <div className="navbartop-links">
        <div className="logout">
          <Logout className="navbartop-link-item" to="/" />
        </div>
        <button type="button" className="account-details">
          <Link className="account-details" to="account-details">
            <FontAwesomeIcon icon={faUser} className="font-awesome" />
            {/* <div>My Account</div> */}
          </Link>
        </button>
      </div>
    </div>
  );
};
export default NavBarTop;
