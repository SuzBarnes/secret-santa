import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1 className="navbar-title">NavBar</h1>
      <ul className="navbar-links">
        <li>
          <Link className="navbar-link-item" to="/">
            My Events
          </Link>
        </li>
        <li>
          <Link className="navbar-link-item" to="create-event">
            Create Event
          </Link>
        </li>
        <li>
          <Link className="navbar-link-item" to="account-details">
            Account Details
          </Link>
        </li>
        <li>
          <Link className="navbar-link-item" to="login">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
