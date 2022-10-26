import React from "react";
import "../styles/accountdetails.scss";
import user from "../data/user.json";
import likesDislikes from "../data/likesDislikes.json";

const AccountDetails = () => {
  return (
    <div className="account-details-container">
      <div className="account-details-title">
        Account Details. <button type="submit">edit</button>
      </div>
      <div className="fields-container">
        <div className="field-card">
          <div className="field-tag">name </div>
          <div className="field-value">{user.users[0].name}</div>
        </div>
        <div className="field-card">
          <div className="field-tag">email </div>
          <div className="field-value">{user.users[0].email}</div>
        </div>
        <div className="field-card">
          <div className="field-tag">likes</div>
          {likesDislikes.likesDislikes.likes.split(", ").map((item) => (
            <div className="field-value">{item}</div>
          ))}
        </div>
        <div className="field-card">
          <div className="field-tag">dislikes </div>
          {likesDislikes.likesDislikes.dislikes.split(", ").map((item) => (
            <div className="field-value">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
