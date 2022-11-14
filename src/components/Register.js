import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Alert from "./Alert";

const Register = () => {
  const initialState = {
    register: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_check: "",
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
    if (register.password === register.password_check) {
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
    }
    setAlert({
      message: "Passwords do not match",
      isSuccess: false,
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
            <input
              id="register-password-check"
              name="password_check"
              type={passwordShown ? "text" : "password"}
              placeholder="Re-enter password"
              value={register.password_check}
              onChange={handleRegisterChange}
              required
            />
            <div className="register-div">
              <button
                type="submit"
                className="button-div register-button"
                data-testid="register"
              >
                Register
              </button>

              <button
                type="button"
                className="button-div eye-button"
                onClick={togglePassword}
                data-testid="togglePasswordButton"
              >
                {!passwordShown ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="font-awesome"
                    title="eyeSlash"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="font-awesome"
                    title="eye"
                  />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div>
          Already have an account?
          <span className="line">
            <a href="login">Sign In</a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Register;
