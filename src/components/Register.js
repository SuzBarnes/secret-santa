import React, { useState } from "react";
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
    <div>
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <Alert message={alert.message} success={alert.isSuccess} />

        <input
          id="first_name"
          name="first_name"
          placeholder="Enter First Name"
          value={register.first_name}
          onChange={handleRegisterChange}
          required
        />
        <input
          id="last_name"
          name="last_name"
          placeholder="Enter Surname"
          value={register.last_name}
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
