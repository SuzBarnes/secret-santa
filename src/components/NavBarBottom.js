import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbarbottom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

const NavBarBottom = () => {
  return (
    <div className="navbarbottom">
      <ul className="navbarbottom-links">
        <li>
          <Link className="navbarbottom-link-item" to="/">
            <FontAwesomeIcon icon={faGift} className="font-awesome" />
            My Events
          </Link>
        </li>
        <li>
          <Link className="navbarbottom-link-item" to="create-event">
            <FontAwesomeIcon icon={faGift} className="font-awesome" />
            Create Event
          </Link>
        </li>
        <li>
          <Link className="navbarbottom-link-item" to="account-details">
            <FontAwesomeIcon icon={faGift} className="font-awesome" />
            Account Details
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBarBottom;
