/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import "../styles/myevents.scss";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthProvider";
import Login from "./Login";

const MY_EVENTS_URL = "http://localhost:3000/userevents";

const MyEvents = () => {
  const [eventData, setEventData] = useState({
    title: "",
    exchange_date: "",
    budget: "",
    participants: "",
    adminId: "1",
  });
  const [isEventAdmin, setIsEventAdmin] = useState(false);
  const { userId } = useAuthContext();

  useEffect(() => {
    if (userId) {
      axios.get(`${MY_EVENTS_URL}/userid/${userId}`).then(({ data }) => {
        console.log(data);
        console.log(data[0].Event);
        setEventData(data[0].Event);
        if (userId === eventData.adminId) {
          setIsEventAdmin(true);
          console.log("admin logged in");
        }
      });
    }
  }, [userId, eventData.adminId]);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
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
      {userId && (
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
                readOnly={!isEventAdmin}
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
                readOnly={!isEventAdmin}
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
                readOnly={!isEventAdmin}
              />
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
      )}
    </div>
  );
};

export default MyEvents;
