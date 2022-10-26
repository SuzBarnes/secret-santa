import React, { useState } from "react";
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
          {likes.split(", ").map((item) => (
            <div className="like-container" key={item}>
              <input
                className="field-value"
                id="likes"
                name="likes"
                placeholder={item}
                type="text"
                readOnly={true}
              />
              {!notEditable && (
                <button
                  className="like-button"
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
                id="likes"
                name="likes"
                placeholder=""
                type="text"
                value={newLike}
                onChange={handleLikeChange}
              />
              {!notEditable && (
                <button
                  className="like-button"
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
          {dislikes.split(", ").map((item) => (
            <div className="like-container" key={item}>
              <input
                className="field-value"
                id="dislikes"
                name="dislikes"
                placeholder={item}
                type="text"
                readOnly={true}
              />
              {!notEditable && (
                <button
                  className="like-button"
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
                id="dislikes"
                name="dislikes"
                placeholder=""
                type="text"
                value={newDislike}
                onChange={handleDislikeChange}
              />
              {!notEditable && (
                <button
                  className="like-button"
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
