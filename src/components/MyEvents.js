/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import "../styles/myevents.scss";
import events from "../data/event.json";
import { useAuthContext } from "../contexts/AuthProvider";

const MyEvents = () => {
  const [eventData, setEventData] = useState(events.events[0]);
  const [isEventAdmin, setIsEventAdmin] = useState(false);
  const { userId } = useAuthContext();

  useEffect(() => {
    if (userId === eventData.adminId) {
      setIsEventAdmin(true);
      console.log("admin llgged in");
    }
  }, [userId, eventData.adminId]);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  return (
    <div className="my-events-container">
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
            id="date"
            name="date"
            placeholder="date"
            type="text"
            value={eventData.date}
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
  );
};
export default MyEvents;
