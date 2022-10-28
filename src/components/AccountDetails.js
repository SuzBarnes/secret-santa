/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import "../styles/accountdetails.scss";

const ACCOUNT_DETAILS_URL = "/users";

const AccountDetails = () => {
  const [notEditable, setNotEditable] = useState(true);
  const [fields, setFields] = useState({
    first_name: "Richard",
    last_name: "Heffernan",
    email: "richard@ss.com",
    password: "password23",
    likes: "none",
    dislikes: "none",
  });
  const [newLike, setNewLike] = useState("");
  const [newDislike, setNewDislike] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isSure, setIsSure] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState(6);

  useEffect(() => {
    axios
      .get(`${ACCOUNT_DETAILS_URL}/${userId}`)
      .then(({ data }) => setFields(data[0]));
  }, [userId]);

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleLikeChange = (event) => {
    setNewLike(event.target.value);
  };

  const handleDislikeChange = (event) => {
    setNewDislike(event.target.value);
  };

  const handleLikeDelete = (item) => {
    const newLikes = fields.likes
      .split(", ")
      .filter((like) => like !== item)
      .join(", ");
    setFields({
      ...fields,
      likes: newLikes,
    });
  };

  const handleDislikeDelete = (item) => {
    const newDislikes = fields.dislikes
      .split(", ")
      .filter((dislike) => dislike !== item)
      .join(", ");
    setFields({
      ...fields,
      dislikes: newDislikes,
    });
  };

  const handleLikeAdd = () => {
    const array = fields.likes.split(", ");
    array.push(newLike);
    setFields({ ...fields, likes: array.join(", ") });
    setNewLike("");
  };

  const handleDislikeAdd = () => {
    const array = fields.dislikes.split(", ");
    array.push(newDislike);
    setFields({ ...fields, dislikes: array.join(", ") });
    setNewDislike("");
  };

  const handlePasswordChange = () => {
    axios.get(`${ACCOUNT_DETAILS_URL}/${userId}`).then(({ data }) => {
      if (
        checkPassword === data[0].password &&
        newPassword === retypeNewPassword
      ) {
        console.log("password changed");
        axios.patch(`${ACCOUNT_DETAILS_URL}/${userId}`, {
          password: newPassword,
        });
      } else {
        console.log("incorrect password");
      }
    });
  };

  const handleChangeOfDetails = () => {
    console.log("detils changed");
    axios.patch(`${ACCOUNT_DETAILS_URL}/${userId}`, {
      first_name: fields.first_name,
      last_name: fields.last_name,
      email: fields.email,
      likes: fields.likes,
      dislikes: fields.dislikes,
    });
    setNotEditable(true);
  };

  const handleDeleteAccount = () => {
    if (!isSure) {
      setIsSure(true);
    } else if (isSure) {
      axios.delete(`${ACCOUNT_DETAILS_URL}/${userId}`);
      setIsSure(false);
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
          <button type="submit" onClick={handleChangeOfDetails}>
            save
          </button>
        )}
      </div>
      <div className="fields-container">
        <div className="field-card">
          <input
            className="field-value"
            id="first_name"
            name="first_name"
            placeholder="first name"
            type="text"
            value={fields.first_name}
            onChange={handleChange}
            readOnly={notEditable}
          />
        </div>
        <div className="field-card">
          <input
            className="field-value"
            id="last_name"
            name="last_name"
            placeholder="last name"
            type="text"
            value={fields.last_name}
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
          {fields.likes.split(", ").map((item, index) => (
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
                  name="likes"
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
          {fields.dislikes.split(", ").map((item, index) => (
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
        {!notEditable && (
          <div className="field-card">
            {isSure && (
              <div className="delete-confirm-message">
                Are you sure? Your account will not be able to be retrieved upon
                deletion
              </div>
            )}
            <button type="submit" onClick={handleDeleteAccount}>
              {isSure ? "confirm" : "delete account"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default AccountDetails;
