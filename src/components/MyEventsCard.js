/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import "../styles/myeventscard.scss";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthProvider";

const MY_EVENTS_URL = "http://localhost:3000/userevents";

const MyEventsCard = () => {
  const initialState = {
    Event: {
      eventId: "",
      title: "",
      exchange_date: "",
      budget: "",
      participants: "",
      drawn: false,
      AdminId: "",
    },
  };
  const { userId } = useAuthContext();
  const [eventData, setEventData] = useState(initialState.Event);
  const [dataArray, setDataArray] = useState(initialState.Event);
  const [buyForId, setBuyForId] = useState("");
  const [eventCode, setEventCode] = useState("");
  // const [isEventAdmin, setIsEventAdmin] = useState(false);

  useEffect(() => {
    if (userId) {
      axios.get(`${MY_EVENTS_URL}/userid/${userId}`).then(({ data }) => {
        setEventData(data[0].Event);
        setDataArray(data);
        setBuyForId(data[0].BuyFor.first_name);
      });
    }
  }, [userId]);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextEvent = (e) => {
    if (currentIndex < dataArray.length) {
      e.preventDefault();
      const nextEventIndex = currentIndex + 1;
      setCurrentIndex(nextEventIndex);
      setCurrentIndex(nextEventIndex);
      setBuyForId(dataArray[nextEventIndex].BuyFor.first_name);
      setEventData(dataArray[nextEventIndex].Event);
    }
  };

  const prevEvent = (e) => {
    try {
      if (currentIndex >= 0) {
        e.preventDefault();
        const prevEventIndex = currentIndex - 1;
        setCurrentIndex(prevEventIndex);
        setBuyForId(dataArray[prevEventIndex].BuyFor.first_name);
        setEventData(dataArray[prevEventIndex].Event);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCodeChange = (event) => {
    console.log("code changed");
    setEventCode(event.target.value);
  };

  return (
    <div className="my-events-container">
      {Event.eventId ? (
        <div>
          <label htmlFor="code">
            Enter event code here
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
        <div>
          <div className="my-events-title">My events</div>

          <div className="event-data-container">
            <div className="event-data-card">{eventData.title}</div>
            <div className="event-data-card">
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
            <div
              className="event-data-card"
              onChange={handleChange}
              id="event-budget"
            >
              £{`${eventData.budget}`}
            </div>
            <div className="event-data-card">
              You are buying for...
              <div>{`${buyForId}`}</div>
            </div>
            <div className="event-data-card">
              <div className="event-data-tag">Participants</div>
              {eventData.participants &&
                eventData.participants.split(", ").map((item) => (
                  <div className="like-container" key={item}>
                    {item}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <button type="button" onClick={nextEvent}>
        NEXT
      </button>
      <div className="previous-button">
        <button type="button" onClick={prevEvent} disabled={currentIndex === 0}>
          PREVIOUS
        </button>
      </div>
    </div>
  );
};

export default MyEventsCard;
