import React from "react";
import "../styles/app.scss";
import { Route, Routes } from "react-router-dom";
import NavBarTop from "./NavBarTop";
import NavBarBottom from "./NavBarBottom";
import MyEvents from "./MyEvents";
import CreateEvent from "./CreateEvent";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import AccountDetails from "./AccountDetails";

const App = () => {
  return (
    <div className="App">
      <NavBarTop />
      <NavBarBottom />
      <div className="main">
        <Routes>
          <Route path="/" element={<MyEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="login" element={<Login />} />
<<<<<<< Updated upstream
          <Route path="/logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route path="account-details" element={<AccountDetails />} />
=======
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route
            path="account-details"
            element={userId ? <AccountDetails /> : <Navigate to="/login" />}
          />
>>>>>>> Stashed changes
        </Routes>
      </div>
    </div>
  );
};

export default App;
