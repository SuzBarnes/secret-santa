/* eslint-disable no-console */
import React, { useState } from "react";
import "../styles/login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
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
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <Alert message={alert.message} success={alert.isSuccess} />
        <input
          id="email"
          name="email"
          placeholder="Email Address"
          value={login.email}
          onChange={handleLoginChange}
          required
        />

        <input
          id="password"
          name="password"
          type={passwordShown ? "text" : "password"}
          placeholder="Enter valid password"
          value={login.password}
          onChange={handleLoginChange}
          required
        />
        <button type="button" onClick={togglePassword}>
          <FontAwesomeIcon icon={faEye} className="font-awesome" />
        </button>
        <button type="submit">Log in</button>
      </form>
      <p>
        Need an Account?
        <span className="line">
          <a href="register">Sign Up</a>
        </span>
      </p>
    </div>
  );
};
export default Login;
