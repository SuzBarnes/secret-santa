import React, { useState } from "react";
import "../styles/login.scss";

const Login = () => {
  const initialState = {
    fields: {
      email: "",
      password: "",
    },
  };
  const [fields, setFields] = useState(initialState.fields);
  const handleLogin = (event) => {
    event.preventDefault();
    console.log(fields);
  };
  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          id="email"
          name="email"
          placeholder="Email Address"
          value={fields.email}
          onChange={handleFieldChange}
        />

        <input
          id="password"
          name="password"
          placeholder="Enter valid password"
          value={fields.password}
          onChange={handleFieldChange}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
export default Login;
