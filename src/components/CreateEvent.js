/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/createevent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/AuthProvider";

const CreateEvent = () => {
  const { userId } = useAuthContext();

  const [newName, setNewName] = useState("");
  const [fields, setFields] = useState({
    title: "",
    exchange_date: "",
    budget: "",
    participants: "",
    drawn: false,
    AdminId: userId,
  });
  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}`).then((response) => {
      const firstName = response.data[0].first_name;
      setFields({ ...fields, participants: firstName });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameDelete = (item) => {
    setFields({
      ...fields,
      participants: fields.participants
        .split(", ")
        .filter((name) => name !== item)
        .join(", "),
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNameAdd = (event) => {
    event.preventDefault();
    if (newName) {
      let array;
      if (fields.participants) {
        array = fields.participants.split(", ");
      } else {
        array = [];
      }
      array.push(newName);
      setFields({ ...fields, participants: array.join(", ") });
      setNewName("");
    }
  };

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields);

    axios
      .post(`http://localhost:3000/events`, fields)
      .then(changeLocation("/"));
  };

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  return (
    <div className="create-event-container">
      <form className="create-event-form" onSubmit={handleSubmit}>
        <div className="field-card">
          <h1>Create Event</h1>
        </div>
        <div className="field-card">
          <input
            value={fields.title}
            className="field-value-title"
            name="title"
            type="text"
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div className="field-card">
          <input
            value={fields.budget}
            className="field-value-budget"
            name="budget"
            type="number"
            placeholder="Budget"
            onChange={handleChange}
          />
        </div>
        <div className="field-card">
          <input
            value={fields.exchange_date}
            className="field-value-date"
            name="exchange_date"
            type="date"
            onChange={handleChange}
          />
        </div>
        <div className="field-card">
          {fields.participants &&
            fields.participants.split(", ").map((item, index) => (
              <div className="name-container" key={item}>
                <input
                  className="field-value"
                  data-testid="participants"
                  name="participants"
                  placeholder={item}
                  type="text"
                />

                <button
                  className="name-button"
                  name="participants"
                  data-testid={`name-delete-button-${index}`}
                  type="submit"
                  onClick={() => handleNameDelete(item)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            ))}

          <div className="name-container">
            <input
              className="field-value"
              name="participants"
              placeholder="Add Name"
              type="text"
              value={newName}
              onChange={handleNameChange}
            />

            <button
              className="add-name-button"
              data-testid="name-add-button"
              type="submit"
              onClick={handleNameAdd}
              onSubmit={handleNameAdd}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateEvent;
