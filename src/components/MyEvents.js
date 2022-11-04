/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import "../styles/myevents.scss";
import axios from "axios";
import Alert from "./Alert";
import { useAuthContext } from "../contexts/AuthProvider";
import Login from "./Login";

const MY_EVENTS_URL = "http://localhost:3000/userevents";

const MyEvents = () => {
  const [eventData, setEventData] = useState({
    eventId: "",
    title: "",
    exchange_date: "",
    budget: "",
    participants: "",
    adminId: "1",
  });
  const [eventInvite, setEventInvite] = useState({
    eventId: "",
    title: "",
    names: "",
  });
  const [buyForId, setBuyForId] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  });
  const { userId } = useAuthContext();

  useEffect(() => {
    if (userId) {
      axios
        .get(`${MY_EVENTS_URL}/userid/${userId}`)
        .then(({ data }) => {
          console.log(data);
          console.log(data[0].Event);
          setEventData(data[0].Event);
          console.log(data[0].BuyFor.first_name);
          setBuyForId(data[0].BuyFor.first_name);
          console.log("eventId", data[0].Event.eventId);
        })
        .catch(() => {
          // setAlert({
          //   message: "You currently aren't in an event",
          //   isSuccess: false,
          // });
        });
    }
  }, [userId, eventData.eventId]);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const handleCodeChange = (event) => {
    console.log("code changed");
    setEventCode(event.target.value);
  };

  const handleCodeEnter = () => {
    axios
      .get(`http://localhost:3000/events/${eventCode}`)
      .then(({ data }) => {
        console.log("eventId invite", data[0].id);
        setEventInvite({
          eventId: data[0].id,
          title: data[0].title,
          names: data[0].participants,
        });
        console.log(data[0]);
      })
      .catch(() => {
        setAlert({
          message: "Wrong code, please try again",
          isSuccess: false,
        });
      });
  };

  const eventCheck = () => {
    console.log(eventInvite);
  };

  if (!userId) {
    return (
      <div className="login-home">
        <Login className="login-form" to="/" />
      </div>
    );
  }

  return (
    <div className="my-events-container">
<<<<<<< Updated upstream
      {!Event.eventId ? (
        <div>
          <label htmlFor="code">
            enter event code here
            <input
              className="code"
              id="code"
              name="code"
              placeholder="code"
              type="text"
              value={eventCode}
              onChange={handleCodeChange}
            />
          </label>
        </div>
      ) : (
=======
      <Alert message={alert.message} success={alert.isSuccess} />
      {eventData.eventId ? (
>>>>>>> Stashed changes
        <div>
          <div className="my-events-title">My events</div>
          <div className="event-data-container">
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
              <input
                className="event-data-value"
                id="exchange_date"
                name="exchange_date"
                placeholder="exchange_date"
                type="text"
                value={eventData.exchange_date}
                onChange={handleChange}
              />
            </div>
            <div className="event-data-card">
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
              You are buying for...
              <div>{buyForId}</div>
            </div>
            <div className="event-data-card">
              <div className="event-data-tag">participants</div>
              {eventData.participants &&
                eventData.participants.split(", ").map((item) => (
                  <div className="like-container" key={item}>
                    <input
                      className="field-value"
                      data-testid="likes"
                      name="likes"
                      placeholder={item}
                      type="text"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {eventInvite.eventId ? (
            <div>
              <div>{eventInvite.title}</div>
              {eventInvite.names.split(", ").map((item) => (
                <button type="button" key={item}>
                  {item}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <label htmlFor="code">
                enter event code here
                <input
                  className="code"
                  id="code"
                  name="code"
                  placeholder="code"
                  type="text"
                  value={eventCode}
                  onChange={handleCodeChange}
                />
              </label>
              <button type="submit" onClick={handleCodeEnter}>
                enter
              </button>
              <button type="submit" onClick={eventCheck}>
                check
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
