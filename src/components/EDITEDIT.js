/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import "../styles/myevents.scss";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthProvider";
import Alert from "./Alert";
import MyEventsCard from "./MyEvents";

const MyEvents = () => {
  const { userId } = useAuthContext();
  const initialState = {
    events: [],
    alert: {
      message: "",
      isSuccess: false,
    },
  };
  const [events, setEvents] = useState(initialState.events);
  const [alert, setAlert] = useState(initialState.alert);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/userevents/userid/${userId}`)
      .then(({ data }) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error(err);
        setAlert({
          message: "Server error, please try again later.",
        });
      });
  }, [userId]);

  return (
    <div className="events">
      <Alert message={alert.message} />
      {events.map((event) => (
        <div key={event.id} className="item">
          <MyEventsCard {...event} />
        </div>
      ))}
    </div>
  );
};

export default MyEvents;
