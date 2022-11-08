/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faMinus,
  faPlus,
  faTrashCan,
  faUserPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Alert from "./Alert";
import "../styles/accountdetails.scss";
import { useAuthContext } from "../contexts/AuthProvider";

const ACCOUNT_DETAILS_URL = "http://localhost:3000/users";

const AccountDetails = () => {
  const initialState = {
    fields: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      likes: "",
      dislikes: "",
    },
    password: {
      checkPassword: "",
      newPassword: "",
      retypeNewPassword: "",
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };
  const [notEditable, setNotEditable] = useState(true);
  const [fields, setFields] = useState(initialState.fields);
  const [newLike, setNewLike] = useState("");
  const [newDislike, setNewDislike] = useState("");
  const [password, setPassword] = useState(initialState.password);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isSure, setIsSure] = useState(false);
  const [alert, setAlert] = useState(initialState.alert);
  const { userId, setUserId } = useAuthContext();

  useEffect(() => {
    axios
      .get(`${ACCOUNT_DETAILS_URL}/${userId}`)
      .then(({ data }) => setFields(data[0]))
      .catch(() => {
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        });
      });
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

  const handleListDelete = (item, likeOrDislike) => {
    const array = fields[likeOrDislike];
    setFields({
      ...fields,
      [likeOrDislike]: array
        .split(", ")
        .filter((like) => like !== item)
        .join(", "),
    });
  };

  const handleLikeAdd = () => {
    if (newLike) {
      let array;
      if (fields.likes) {
        array = fields.likes.split(", ");
        const itemMatch = array.filter((item) => item === newLike);
        if (itemMatch.length === 0) {
          array.push(newLike);
          setAlert({
            message: "",
            isSuccess: false,
          });
        } else {
          setAlert({
            message: "This already exists",
            isSuccess: false,
          });
        }
      } else {
        array = [];
        array.push(newLike);
      }

      setFields({ ...fields, likes: array.join(", ") });
      setNewLike("");
    }
  };

  const handleDislikeAdd = () => {
    if (newDislike) {
      let array;
      if (fields.dislikes) {
        array = fields.dislikes.split(", ");
        const itemMatch = array.filter((item) => item === newDislike);
        if (itemMatch.length === 0) {
          array.push(newDislike);
          setAlert({
            message: "",
            isSuccess: false,
          });
        } else {
          setAlert({
            message: "This already exists",
            isSuccess: false,
          });
        }
      } else {
        array = [];
        array.push(newDislike);
      }
      setFields({ ...fields, dislikes: array.join(", ") });
      setNewDislike("");
    }
  };

  // Need to redo this because of jwt use.
  const handlePasswordChange = () => {
    if (password.newPassword === password.retypeNewPassword) {
      axios
        .post(`http://localhost:3000/api/auth/signin`, {
          email: fields.email,
          password: password.checkPassword,
        })
        .then((res) => {
          if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
          console.log(res.data.accessToken);
          setAlert({
            message: `${res.data.message}`,
            isSuccess: true,
          });
          return res.data;
        })
        .catch((err) => {
          setAlert({
            message: `${err.response.data.message}`,
            isSuccess: false,
          });
        });
    }
    // axios
    //   .get(`${ACCOUNT_DETAILS_URL}/${userId}`)
    //   .then(({ data }) => {
    //     if (
    //       password.checkPassword === data[0].password &&
    //       password.newPassword === password.retypeNewPassword
    //     ) {
    //       console.log("password changed");
    //       axios
    //         .patch(`${ACCOUNT_DETAILS_URL}/${userId}`, {
    //           password: password.newPassword,
    //         })
    //         .catch(() => {
    //           setAlert({
    //             message: "Server error, please try again later",
    //             isSuccess: false,
    //           });
    //         });
    //     } else {
    //       console.log("incorrect password");
    //     }
    //   })
    //   .catch(() => {
    //     setAlert({
    //       message: "Server error, please try again later",
    //       isSuccess: false,
    //     });
    //   });
  };

  const handleChangeOfDetails = () => {
    axios
      .patch(`${ACCOUNT_DETAILS_URL}/${userId}`, {
        first_name: fields.first_name,
        last_name: fields.last_name,
        email: fields.email,
        likes: fields.likes,
        dislikes: fields.dislikes,
      })
      .then(() => {
        setNotEditable(true);
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        });
      });
  };

  const navigate = useNavigate();
  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const handleDeleteAccount = () => {
    if (!isSure) {
      setIsSure(true);
    } else if (isSure) {
      axios
        .delete(`${ACCOUNT_DETAILS_URL}/${userId}`)
        .then(() => {
          localStorage.clear();
          sessionStorage.clear();
          setUserId("");
          changeLocation("/register");
          setIsSure(false);
        })
        .catch(() => {
          setAlert({
            message: "Server error, please try again later",
            isSuccess: false,
          });
        });
    }
  };

  const onCancel = () => {
    axios
      .get(`${ACCOUNT_DETAILS_URL}/${userId}`)
      .then(({ data }) => {
        setFields(data[0]);
        setNotEditable(true);
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        });
      });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="account-details-container">
      <Alert
        className="alert-message"
        message={alert.message}
        success={alert.isSuccess}
      />
      <div className="account-details-title">
        <h1>Your Details</h1>
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
                name="checkPassword"
                type={passwordShown ? "text" : "password"}
                placeholder="Current password"
                value={password.checkPassword}
                onChange={(event) =>
                  setPassword({
                    ...password,
                    [event.target.name]: event.target.value,
                  })
                }
              />
              <input
                className="field-value"
                name="newPassword"
                type={passwordShown ? "text" : "password"}
                placeholder="New password"
                value={password.newPassword}
                onChange={(event) =>
                  setPassword({
                    ...password,
                    [event.target.name]: event.target.value,
                  })
                }
              />
              <input
                className="field-value"
                name="retypeNewPassword"
                type={passwordShown ? "text" : "password"}
                placeholder="Confirm new password"
                value={password.retypeNewPassword}
                onChange={(event) =>
                  setPassword({
                    ...password,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
            <div className="changepwd-div">
              <button
                type="submit"
                className="password-button-text"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>
              <button
                type="button"
                className="password-button-image"
                onClick={togglePassword}
              >
                {!passwordShown ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="eye-icon"
                    data-testid="eye-icon"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="slash-eye-icon"
                  />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="field-card">
          <div className="field-tag">Likes:</div>
          {fields.likes &&
            fields.likes.split(", ").map((item, index) => (
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
                    onClick={() => handleListDelete(item, "likes")}
                  >
                    <FontAwesomeIcon icon={faMinus} className="font-awesome" />
                  </button>
                )}
              </div>
            ))}
          {!notEditable && (
            <div className="like-container">
              <input
                className="field-value"
                name="likes"
                placeholder="Add like.."
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
                  <FontAwesomeIcon icon={faPlus} className="font-awesome" />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="field-card">
          <div className="field-tag">Dislikes:</div>
          {fields.dislikes &&
            fields.dislikes.split(", ").map((item, index) => (
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
                    onClick={() => handleListDelete(item, "dislikes")}
                  >
                    <FontAwesomeIcon icon={faMinus} className="font-awesome" />
                  </button>
                )}
              </div>
            ))}
          {!notEditable && (
            <div className="like-container">
              <input
                className="field-value"
                name="dislikes"
                placeholder="Add dislike..."
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
                  <FontAwesomeIcon icon={faPlus} className="font-awesome" />
                </button>
              )}
            </div>
          )}
        </div>
        {!notEditable && (
          <div className="field-card">
            {isSure && (
              <div className="delete-confirm-message">
                Are you sure? Your account will be permanently deleted.
              </div>
            )}
            <button
              type="submit"
              className="delete-button"
              onClick={handleDeleteAccount}
            >
              {isSure ? (
                <FontAwesomeIcon icon={faCheck} className="font-awesome" />
              ) : (
                <FontAwesomeIcon icon={faTrashCan} className="font-awesome" />
              )}
            </button>
            {isSure && (
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsSure(false)}
              >
                <FontAwesomeIcon icon={faXmark} className="font-awesome" />
              </button>
            )}
          </div>
        )}
        {notEditable ? (
          <button
            type="submit"
            className="edit-button"
            onClick={() => setNotEditable(false)}
          >
            <FontAwesomeIcon icon={faUserPen} className="font-awesome" />
          </button>
        ) : (
          <button
            type="submit"
            className="save-button"
            onClick={handleChangeOfDetails}
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="font-awesome" />
          </button>
        )}
        {!notEditable && !isSure && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            <FontAwesomeIcon icon={faXmark} className="font-awesome" />
          </button>
        )}
      </div>
    </div>
  );
};
export default AccountDetails;
