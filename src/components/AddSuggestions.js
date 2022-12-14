/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addsuggestions.scss";
import PropTypes from "prop-types";
import axios from "axios";

const AddSuggestions = ({ nameToAddSuggestion }) => {
  const { userId, firstName } = nameToAddSuggestion;
  const [usersSuggestions, setUsersSuggestions] = useState("");
  const [suggestionsToAdd, setSuggestionsToAdd] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}`).then(({ data }) => {
      console.log("user data with suggestions", data);
      if (data[0].suggestions) {
        setUsersSuggestions(data[0].suggestions);
      }
    });
  }, [userId]);

  const handleChange = (event) => {
    setSuggestionsToAdd(event.target.value);
  };

  const navigate = useNavigate();
  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let array = [];
    if (usersSuggestions) {
      array = usersSuggestions.split(", ");
    }
    console.log(array);
    array.push(suggestionsToAdd);
    const patchData = array.join(", ");
    console.log(patchData);
    axios
      .patch(`http://localhost:3000/users/${userId}`, {
        suggestions: patchData,
      })
      .then(() => {
        console.log("suggestions updated");
        setTimeout(() => {
          changeLocation("/");
        }, 2000);
      })
      .catch();
    console.log("added suggestion");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="suggestions"
          id="suggestions"
          name="suggestions"
          placeholder={`Enter your ideas for ${firstName}!`}
          type="text"
          value={suggestionsToAdd}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

AddSuggestions.propTypes = {
  nameToAddSuggestion: PropTypes.shape({
    userId: PropTypes.number,
    firstName: PropTypes.string,
  }).isRequired,
};

export default AddSuggestions;
