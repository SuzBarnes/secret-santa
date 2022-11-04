import React from "react";
import "../styles/app.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBarTop from "./NavBarTop";
import NavBarBottom from "./NavBarBottom";
import MyEvents from "./MyEvents";
import CreateEvent from "./CreateEvent";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import AccountDetails from "./AccountDetails";
import AdminCard from "./AdminCard";
import { useAuthContext } from "../contexts/AuthProvider";

const App = () => {
  const { userId } = useAuthContext();

  return (
    <div className="App">
      <NavBarTop />
      <NavBarBottom />
      <div className="main">
        <Routes>
          <Route path="/" element={<MyEvents />} />
          <Route
            path="/eventadmin"
            element={userId ? <AdminCard /> : <Navigate to="/login" />}
          />
          <Route
            path="create-event"
            element={userId ? <CreateEvent /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route
            path="account-details"
            element={userId ? <AccountDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
