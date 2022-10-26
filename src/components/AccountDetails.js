import React, { useState } from "react";
import "../styles/accountdetails.scss";
import user from "../data/user.json";
import likesDislikes from "../data/likesDislikes.json";

const AccountDetails = () => {
  const [notEditable, setNotEditable] = useState(true);
  const [fields, setFields] = useState(user.users[0]);

  // const handleFieldChange = (event) => {
  //   setFields({ ...fields, [event.target.name]: event.target.value });
  // };

  const handleChange = (event) => {
    setFields({ ...user.users[0], [event.target.name]: event.target.value });
  };

  return (
    <div className="account-details-container">
      <div className="account-details-title">
        Account Details.{" "}
        <button type="submit" onClick={() => setNotEditable(false)}>
          edit
        </button>
      </div>
      <div className="fields-container">
        <div className="field-card">
          <label className="field-tag" htmlFor="name">
            Name
            <input
              className="field-value"
              id="name"
              name="name"
              placeholder="name"
              type="text"
              value={fields.name}
              onChange={handleChange}
              readOnly={notEditable}
            />
          </label>
        </div>
        <div className="field-card">
          <label className="field-tag" htmlFor="email">
            Email
            <input
              className="field-value"
              id="email"
              name="email"
              placeholder="email"
              type="text"
              value={fields.email}
              onChange={handleChange}
              readOnly={notEditable}
            />
          </label>
        </div>
        <div className="field-card">
          <div className="field-tag">likes</div>
          {likesDislikes.likesDislikes.likes.split(", ").map((item) => (
            <div key={item} className="field-value">
              {item}
            </div>
          ))}
        </div>
        <div className="field-card">
          <div className="field-tag">dislikes </div>
          {likesDislikes.likesDislikes.dislikes.split(", ").map((item) => (
            <div key={item} className="field-value">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
