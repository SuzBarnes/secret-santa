/* eslint-disable no-console */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthProvider";
import Alert from "./Alert";

const Login = () => {
  const initialState = {
    login: {
      email: "",
      password: "",
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };
  const [login, setLogin] = useState(initialState.login);
  const [passwordShown, setPasswordShown] = useState(false);
  const [alert, setAlert] = useState(initialState.alert);

  const { setUserId } = useAuthContext();

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setAlert({ message: "", isSuccess: false });

    axios
      .post(`http://localhost:3000/api/auth/signin`, login)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        setUserId(res.data.id);
        console.log(res.data.accessToken);
        setAlert({
          message: `${res.data.message}`,
          isSuccess: true,
        });
        changeLocation("/");
        return res.data;
      })
      .catch((err) => {
        setAlert({
          message: `${err.response.data.message}`,
          isSuccess: false,
        });
      });
  };

  const handleLoginChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  return (
    <div className="login">
      <div className="description-div">
        <h2>
          Secret Santa...with a <i>twist</i>.
        </h2>
        With 5 simple steps, you could be joining the millions playing Secret
        Santa today!
        <ol>
          <li>Login or Register,</li>
          <li>
            Create your event with the participants, budget and exchange date of
            your choice,
          </li>
          <li>Draw your random name!</li>
          <li>Add your wishlist,</li>
          <li>Add gift ideas for other members, keeping your anonymity!</li>
        </ol>
      </div>
      <div className="form-div">
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <Alert message={alert.message} success={alert.isSuccess} />
            <h3>Login</h3>
          </div>
          <div className="email-div">
            <input
              id="login-email"
              name="email"
              placeholder="Email Address"
              value={login.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="password-div">
            <input
              id="login-password"
              name="password"
              type={passwordShown ? "text" : "password"}
              placeholder="Enter valid password"
              value={login.password}
              onChange={handleLoginChange}
              required
            />
            <button type="button" onClick={togglePassword}>
              {!passwordShown ? (
                <FontAwesomeIcon icon={faEye} className="font-awesome" />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} className="font-awesome" />
              )}
            </button>
          </div>
          <div>
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
      <div className="switch-register">
        <p>
          Need an Account?
          <span className="line">
            <a href="register">Sign Up</a>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
