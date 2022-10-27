/* eslint-disable no-console */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../styles/accountdetails.scss";
import user from "../data/user.json";
import likesDislikes from "../data/likesDislikes.json";

const AccountDetails = () => {
  const [notEditable, setNotEditable] = useState(true);
  const [fields, setFields] = useState(user.users[0]);
  const [likes, setLikes] = useState(likesDislikes.likesDislikes.likes);
  const [dislikes, setDislikes] = useState(
    likesDislikes.likesDislikes.dislikes
  );
  const [newLike, setNewLike] = useState("");
  const [newDislike, setNewDislike] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = (event) => {
    setFields({ ...user.users[0], [event.target.name]: event.target.value });
  };

  const handleLikeChange = (event) => {
    setNewLike(event.target.value);
  };

  const handleDislikeChange = (event) => {
    setNewDislike(event.target.value);
  };

  const handleLikeDelete = (item) => {
    setLikes(
      likes
        .split(", ")
        .filter((like) => like !== item)
        .join(", ")
    );
  };

  const handleDislikeDelete = (item) => {
    setDislikes(
      dislikes
        .split(", ")
        .filter((dislike) => dislike !== item)
        .join(", ")
    );
  };

  const handleLikeAdd = () => {
    const array = likes.split(", ");
    array.push(newLike);
    setLikes(array.join(", "));
    setNewLike("");
  };

  const handleDislikeAdd = () => {
    const array = dislikes.split(", ");
    array.push(newDislike);
    setDislikes(array.join(", "));
    setNewDislike("");
  };

  const handlePasswordChange = () => {
    if (
      checkPassword === user.users[0].password &&
      newPassword === retypeNewPassword
    ) {
      console.log("password changed");
    } else {
      console.log("password mismatch");
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="account-details-container">
      <div className="account-details-title">
        Account Details{" "}
        {notEditable ? (
          <button type="submit" onClick={() => setNotEditable(false)}>
            edit
          </button>
        ) : (
          <button
            type="submit"
            onClick={() => {
              console.log("saved");
              setNotEditable(true);
            }}
          >
            save
          </button>
        )}
      </div>
      <div className="fields-container">
        <div className="field-card">
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
        </div>
        <div className="field-card">
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
        </div>
        {!notEditable && (
          <div className="field-card">
            <div className="password-container">
              <input
                className="field-value"
                name="password"
                type={passwordShown ? "text" : "password"}
                placeholder="current password"
                value={checkPassword}
                onChange={(event) => setCheckPassword(event.target.value)}
              />
              <input
                className="field-value"
                name="password"
                type={passwordShown ? "text" : "password"}
                placeholder="new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <input
                className="field-value"
                name="password"
                type={passwordShown ? "text" : "password"}
                placeholder="retype new password"
                value={retypeNewPassword}
                onChange={(event) => setRetypeNewPassword(event.target.value)}
              />
            </div>
            <button type="submit" onClick={handlePasswordChange}>
              change password
            </button>
            <button type="button" onClick={togglePassword}>
              <FontAwesomeIcon
                icon={faEye}
                className="eyeIcon"
                data-testid="eye-icon"
              />
            </button>
          </div>
        )}
        <div className="field-card">
          <div className="field-tag">likes</div>
          {likes.split(", ").map((item, index) => (
            <div className="like-container" key={item}>
              <input
                className="field-value"
                data-testid="likes"
                name="likes"
                placeholder={item}
                type="text"
              />
              {!notEditable && (
                <button
                  className="like-button"
                  data-testid={`like-delete-button-${index}`}
                  type="submit"
                  onClick={() => handleLikeDelete(item)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          {!notEditable && (
            <div className="like-container">
              <input
                className="field-value"
                name="likes"
                placeholder=""
                type="text"
                value={newLike}
                onChange={handleLikeChange}
              />
              {!notEditable && (
                <button
                  className="add-like-button"
                  data-testid="like-add-button"
                  type="submit"
                  onClick={handleLikeAdd}
                >
                  +
                </button>
              )}
            </div>
          )}
        </div>

        <div className="field-card">
          <div className="field-tag">dislikes</div>
          {dislikes.split(", ").map((item, index) => (
            <div className="like-container" key={item}>
              <input
                className="field-value"
                data-testid="dislikes"
                name="dislikes"
                placeholder={item}
                type="text"
              />
              {!notEditable && (
                <button
                  className="like-button"
                  data-testid={`dislike-delete-button-${index}`}
                  type="submit"
                  onClick={() => handleDislikeDelete(item)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          {!notEditable && (
            <div className="like-container">
              <input
                className="field-value"
                name="dislikes"
                placeholder=""
                type="text"
                value={newDislike}
                onChange={handleDislikeChange}
              />
              {!notEditable && (
                <button
                  className="add-like-button"
                  data-testid="dislike-add-button"
                  type="submit"
                  onClick={handleDislikeAdd}
                >
                  +
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
