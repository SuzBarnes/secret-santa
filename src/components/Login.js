import React, { useState } from "react";
import "../styles/login.scss";
// import AuthContext from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import Alert from "./Alert";

const LOGIN_URL = "/posts";

const Login = () => {
  // const { setAuth } = useContext(AuthContext);

  const initialState = {
    login: {
      email: "",
      password: "",
    },
    register: {
      firstname: "",
      surname: "",
      email: "",
      password: "",
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };
  const [login, setLogin] = useState(initialState.login);
  const [register, setRegister] = useState(initialState.register);
  const [passwordShown, setPasswordShown] = useState(false);
  const [alert, setAlert] = useState(initialState.alert);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setAlert({ message: "", isSuccess: false });

    axios
      .post(LOGIN_URL, JSON.stringify(login), {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then(() => {
        setAlert({
          message: `Welcome ${login.email}`,
          // want it ideally to be welcome register.first name, but not sure how it will access the firstname from the original registration//
          isSuccess: true,
        });
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        });
      });
  };
  const handleRegister = (event) => {
    event.preventDefault();
    setAlert({ message: "", isSuccess: false });
    console.log(register);
    axios
      .post(LOGIN_URL, JSON.stringify(register), {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then(() => {
        setAlert({
          message: `Merry Christmas and welcome ${register.firstname}!`,
          isSuccess: true,
        });
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        });
      });
  };
  const handleLoginChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };
  const handleRegisterChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
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
        <button type="submit" onClick={togglePassword}>
          <FontAwesomeIcon icon={faEye} className="font-awesome" />
        </button>
        <button type="submit">Log in</button>
      </form>
      <p>
        Need an Account?
        <span className="line">
          {/* put router link here */}
          {/* <a href="login">Sign Up</a> */}
        </span>
      </p>
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <Alert message={alert.message} success={alert.isSuccess} />

        <input
          id="firstname"
          name="firstname"
          placeholder="Enter First Name"
          value={register.firstname}
          onChange={handleRegisterChange}
          required
        />
        <input
          id="surname"
          name="surname"
          placeholder="Enter Surname"
          value={register.surname}
          onChange={handleRegisterChange}
          required
        />
        <input
          id="email"
          name="email"
          placeholder="Email Address"
          value={register.email}
          onChange={handleRegisterChange}
          required
        />

        <input
          id="password"
          name="password"
          type={passwordShown ? "text" : "password"}
          placeholder="Enter valid password"
          value={register.password}
          onChange={handleRegisterChange}
          required
        />
        <button type="submit" onClick={togglePassword}>
          <FontAwesomeIcon icon={faEye} className="font-awesome" />
        </button>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Login;
