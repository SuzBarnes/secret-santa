import React from "react";
import "../styles/app.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import MyEvents from "./MyEvents";
import CreateEvent from "./CreateEvent";
import Login from "./Login";
import AccountDetails from "./AccountDetails";

const App = () => {
  return (
    <div className="App">
      <h1>Secret Santa App</h1>
      <NavBar>
        <Routes>
          <Route path="/" element={<MyEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="login" element={<Login />} />
          <Route path="account-details" element={<AccountDetails />} />
        </Routes>
      </NavBar>
    </div>
  );
};

export default App;
