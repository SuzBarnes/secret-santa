/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import "../styles/admincard.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/AuthProvider";
import Alert from "./Alert";

const ADMIN_CARD_URL = "http://localhost:3000/userevents";

const AdminCard = () => {
  const { userId } = useAuthContext();

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
  const [notEditable, setNotEditable] = useState(true);
  const [newParticipant, setNewParticipant] = useState("");
  // const [isSure, setIsSure] = useState(false);
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
        setNotEditable(true);
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        });
      });
  };

  // const handleParticipantAdd = () => {
  //     if (newParticipant) {
  //         let array;
  //         if (eventData.participants) {
  //             array = eventData.newParticipant.split(", ");
  //         } else {
  //             array = [];
  //         }
  //         array.push(newParticipant);
  //         setEventData({ ...eventData, participants: array.join(", ") });
  //         setNewParticipant("");
  //     }
  // };

  const deleteEvent = () => {
    axios
      .delete(`http://localhost:3000/events/${eventData.id}`)
      .then(() => {
        setAlert({
          message: "Event has been deleted",
          isSuccess: true,
        });
        console.log("Event has been deleted");
        setNotEditable(true);
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        });
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
              readOnly={notEditable}
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
              readOnly={notEditable}
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
              readOnly={notEditable}
            />
          </div>
          <div className="event-data-card">
            <div className="event-data-tag">Participants</div>
            <div className="event-data-card">
              <div className="event-data-tag">participants</div>
              {eventData.participants &&
                eventData.participants.split(", ").map((item, index) => (
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
                      readOnly={notEditable}
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
                  value={newParticipant}
                  onChange={handleNameChange}
                />

                <button
                  className="add-name-button"
                  data-testid="name-add-button"
                  type="submit"
                  onClick={handleNameAdd}
                  onSubmit={handleNameAdd}
                  readOnly={notEditable}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          {notEditable ? (
            <button type="submit" onClick={() => setNotEditable(false)}>
              Edit
            </button>
          ) : (
            //  RENDER DRAW BUTTON HERE
            <>
              <button type="submit" onClick={handleChangeOfEventDetails}>
                Save
              </button>
              <button type="submit" onClick={deleteEvent}>
                DELETE EVENT
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
