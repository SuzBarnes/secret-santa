import React, { useState, useRef, useEffect } from "react";
import "../styles/login.scss";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

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
    const [alert, setAlert] = useState(initialState.alert);

    const handleLogin = (event) => {
        event.preventDefault();
        setAlert({ message: "", isSuccess: false });
        console.log(login);
    };
    const handleRegister = (event) => {
        event.preventDefault();
        setAlert({ message: "", isSuccess: false });
        console.log(register);
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
                <input
                    id="login-email"
                    name="login-email"
                    placeholder="Email Address"
                    value={login.email}
                    onChange={handleLoginChange}
                    required
                />

                <input
                    id="login-password"
                    name="login-password"
                    placeholder="Enter valid password"
                    value={login.password}
                    onChange={handleLoginChange}
                    required
                />
                <button type="submit">Log in</button>
            </form>

            <h3>Register</h3>
            <form onSubmit={handleRegister}>
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
                    id="register-email"
                    name="register-email"
                    placeholder="Email Address"
                    value={register.email}
                    onChange={handleRegisterChange}
                    required
                />

                <input
                    id="register-password"
                    name="register-password"
                    placeholder="Enter valid password"
                    value={register.password}
                    onChange={handleRegisterChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
export default Login;
