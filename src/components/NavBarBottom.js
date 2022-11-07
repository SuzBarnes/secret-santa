import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbarbottom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faPlus,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const NavBarBottom = () => {
  return (
    <div className="navbarbottom">
      <div className="list-container">
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
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="font-awesome"
                />
              </div>
              <div>Create</div>
            </Link>
          </li>
          <li>
            <Link className="navbarbottom-link-item" to="joinevent">
              <div>
                <FontAwesomeIcon icon={faPlus} className="font-awesome" />
              </div>
              <div>Join</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavBarBottom;
