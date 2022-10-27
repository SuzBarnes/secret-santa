import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbarbottom.scss";

const NavBarBottom = () => {
  return (
    <div className="navbarbottom">
      <h1 className="navbarbottom-title">NavBar</h1>
      <ul className="navbarbottom-links">
        <li>
          <Link className="navbarbottom-link-item" to="/">
            My Events
          </Link>
        </li>
        <li>
          <Link className="navbarbottom-link-item" to="create-event">
            Create Event
          </Link>
        </li>
        <li>
          <Link className="navbarbottom-link-item" to="account-details">
            Account Details
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBarBottom;
