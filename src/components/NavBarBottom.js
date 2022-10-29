import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbarbottom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const NavBarBottom = () => {
  return (
    <div className="navbarbottom">
      <ul className="navbarbottom-links">
        <li>
          <Link className="navbarbottom-link-item" to="/">
            <div>
              <FontAwesomeIcon icon={faGift} className="font-awesome" />
            </div>
            <div>My Events</div>
          </Link>
        </li>
        <li>
          <Link className="navbarbottom-link-item" to="create-event">
            <div>
              <FontAwesomeIcon icon={faCalendarDays} className="font-awesome" />
            </div>
            <div>Create Event</div>
          </Link>
        </li>
        <li>
          <Link className="navbarbottom-link-item" to="account-details">
            <div>
              <FontAwesomeIcon icon={faUser} className="font-awesome" />
            </div>
            <div>Account Details</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBarBottom;
