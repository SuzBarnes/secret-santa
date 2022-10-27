import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbartop.scss";

const NavBarTop = () => {
  return (
    <div className="navbartop">
      <h1>Secret Santa App</h1>
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
