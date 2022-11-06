/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admincard.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/AuthProvider";
import Alert from "./Alert";

const ADMIN_CARD_URL = "http://localhost:3000/userevents";

const AdminCard = () => {
  const { userId } = useAuthContext();
  const navigate = useNavigate();
  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };
  const initialState = {
    fields: {
      title: "",
      exchange_date: "",
      budget: "",
      participants: "",
      adminId: userId,
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };
  const [eventData, setEventData] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);
  const [newParticipant, setNewParticipant] = useState("");
  const [isSure, setIsSure] = useState(false);
  useEffect(() => {
    axios.get(`${ADMIN_CARD_URL}/userid/${userId}`).then(({ data }) => {
      setEventData(data[0].Event);
    });
  }, [userId, eventData.AdminId]);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const handleNameDelete = (item) => {
    setEventData({
      ...eventData,
      participants: eventData.participants
        .split(", ")
        .filter((name) => name !== item)
        .join(", "),
    });
  };

  const handleNameChange = (event) => {
    setNewParticipant(event.target.value);
  };

  const handleNameAdd = (event) => {
    event.preventDefault();
    if (newParticipant) {
      let array;
      if (eventData.participants) {
        array = eventData.participants.split(", ");
      } else {
        array = [];
      }
      array.push(newParticipant);
      setEventData({ ...eventData, participants: array.join(", ") });
      setNewParticipant("");
    }
  };
  const handleChangeOfEventDetails = () => {
    axios
      .patch(`http://localhost:3000/events/${eventData.id}`, {
        title: eventData.title,
        exchange_date: eventData.exchange_date,
        budget: eventData.budget,
        participants: eventData.participants,
        adminId: eventData.adminId,
      })
      .then(() => {
        setAlert({
          message: "Details have been updated",
          isSuccess: true,
        });
        console.log("Details  have been updated");
        console.log(eventData);
        changeLocation("/");
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        });
      });
  };

  const deleteEvent = () => {
    if (!isSure) {
      setIsSure(true);
    } else if (isSure) {
      axios
        .delete(`http://localhost:3000/events/${eventData.id}`)
        .then(() => {
          setAlert({
            message: "Event has been deleted",
            isSuccess: true,
          });
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
  const secretSantaShuffle = (arr) => {
    const shuffledArr = arr.sort(() => Math.random() - 0.5);
    const copiedArr = [...shuffledArr];
    copiedArr.push(copiedArr.shift());

    for (let i = 0; i < copiedArr.length; i += 1) {
      const patchData = { BuyForId: copiedArr[i] };
      axios.patch(
        `http://localhost:3000/userevents/eventid/${eventData.id}/userid/${shuffledArr[i]}`,
        patchData
      );
      console.log(`${shuffledArr[i]} buys for ${copiedArr[i]}`);
    }
  };

  const drawNames = () => {
    axios
      .get(`http://localhost:3000/userevents/eventid/${eventData.id}`)
      .then((response) => {
        const userIds = response.data.map((user) => user.User.id);
        console.log(userIds);
        secretSantaShuffle(userIds);
      });
  };
  return (
    <div className="admin-card-container">
      <Alert message={alert.message} success={alert.isSuccess} />

      <div>
        <div className="admin-card-title">Admin Card</div>

        <div className="event-data-container">
          Title
          <div className="event-data-card">
            <input
              className="event-data-value"
              id="title"
              name="title"
              placeholder="title"
              type="text"
              value={eventData.title}
              onChange={handleChange}
            />
          </div>
          <div className="event-data-card">
            Exchange Date
            <input
              className="event-data-value"
              id="exchange_date"
              name="exchange_date"
              placeholder="exchange_date"
              type="date"
              value={eventData.exchange_date}
              onChange={handleChange}
            />
          </div>
          <div className="event-data-card">
            Budget
            <input
              className="event-data-value"
              id="budget"
              name="budget"
              placeholder="budget"
              type="text"
              value={`${eventData.budget}`}
              onChange={handleChange}
            />
          </div>
          <div className="event-data-card">
            <div className="event-data-tag">Participants</div>
            <div className="event-data-card">
              {eventData.participants &&
                eventData.participants.split(", ").map((item, index) => (
                  <div className="name-container" key={item}>
                    <input
                      className="name-value"
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
                  className="name-value"
                  name="participants"
                  placeholder="Add Name"
                  type="text"
                  value={newParticipant}
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
          </div>
          <button
            type="submit"
            onClick={drawNames}
            // disabled="eventData.participants.length>0"
          >
            DRAW NAMES
          </button>
          {isSure ? (
            <button type="submit" onClick={() => setIsSure(false)}>
              Cancel
            </button>
          ) : (
            <button type="submit" onClick={handleChangeOfEventDetails}>
              Save
            </button>
          )}
          {isSure && (
            <div className="delete-confirm-message">
              Are you sure you want to delete this event?
            </div>
          )}
          <button type="submit" onClick={deleteEvent}>
            {isSure ? "Confirm" : "Delete Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
