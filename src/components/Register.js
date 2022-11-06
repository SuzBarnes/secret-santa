import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Alert from "./Alert";

const Register = () => {
  const initialState = {
    register: {
      first_name: "",
      last_name: "",
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

  const navigate = useNavigate();
  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setAlert({ message: "", isSuccess: false });
    axios
      .post(`http://localhost:3000/api/auth/signup`, register)
      .then(() => {
        setAlert({
          message: `Merry Christmas and welcome ${register.first_name}!`,
          isSuccess: true,
        });
        changeLocation("/");
      })
      .catch((err) => {
        setAlert({
          message: `${err.response.data.message}`,
          isSuccess: false,
        });
      });
  };

  const handleRegisterChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  return (
    <div className="register">
      <div>
        <h1>Register</h1>
      </div>
      <div>
        <form className="register-form" onSubmit={handleRegister}>
          <div>
            <Alert message={alert.message} success={alert.isSuccess} />
          </div>
          <div className="name-div">
            <input
              id="first_name"
              name="first_name"
              placeholder="Enter First Name"
              value={register.first_name}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="name-div">
            <input
              id="last_name"
              name="last_name"
              placeholder="Enter Surname"
              value={register.last_name}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="email-div">
            <input
              id="register-email"
              name="email"
              placeholder="Email Address"
              value={register.email}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="password-div">
            <input
              id="register-password"
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
          </div>
          <div className="button-div">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <div>
        <p>
          Already have an account?
          <span className="line">
            <a href="login">Sign In</a>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Register;
