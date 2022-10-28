import React, { useState } from "react";
import "../styles/register.scss";
// import AuthContext from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import Alert from "./Alert";

const REGISTER_URL = "/users";

const Register = () => {
  // const { setAuth } = useContext(AuthContext);

  const initialState = {
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
  const [register, setRegister] = useState(initialState.register);
  const [passwordShown, setPasswordShown] = useState(false);
  const [alert, setAlert] = useState(initialState.alert);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setAlert({ message: "", isSuccess: false });
    axios
      .post(REGISTER_URL, JSON.stringify(register), {
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

  const handleRegisterChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  return (
    <div>
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
        <button type="button" onClick={togglePassword}>
          <FontAwesomeIcon icon={faEye} className="font-awesome" />
        </button>

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?
        <span className="line">
          <a href="login">Sign In</a>
        </span>
      </p>
    </div>
  );
};
export default Register;
