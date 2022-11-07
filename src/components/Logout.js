import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalkingArrowRight } from "@fortawesome/free-solid-svg-icons";
// import Alert from "./Alert";
import { useAuthContext } from "../contexts/AuthProvider";
import "../styles/logout.scss";

const Logout = () => {
  // const initialState = {
  //   alert: {
  //     message: "",
  //     isSuccess: false,
  //   },
  // };
  const { setUserId } = useAuthContext();
  // const [alert, setAlert] = useState(initialState.alert);
  const navigate = useNavigate();
  // to get the component to refresh while redirecting, thus clearing whatever details it had stored you need the changeLocation function in the onClick
  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };
  // clear local and session storage, change the userId to "", display the alert, and then refresh and redirect
  const logoutClick = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUserId("");
    // setAlert({
    //   message: "You have successfully logged out",
    //   isSuccess: true,
    // });
    changeLocation("/");
  };
  return (
    <div className="logout">
      {/* <Alert message={alert.message} success={alert.isSuccess} /> */}
      <button type="submit" onClick={logoutClick}>
        <FontAwesomeIcon
          icon={faPersonWalkingArrowRight}
          className="font-awesome"
        />
      </button>
    </div>
  );
};

export default Logout;
