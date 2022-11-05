/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/myevents.scss";
import axios from "axios";
import Alert from "./Alert";
import { useAuthContext } from "../contexts/AuthProvider";
import Login from "./Login";

const MY_EVENTS_URL = "http://localhost:3000/userevents";

const MyEvents = () => {
  const [eventData, setEventData] = useState({
    title: "",
    exchange_date: "",
    budget: "",
    adminId: "3",
  });
  const [eventId, setEventId] = useState("");
  const [eventInvite, setEventInvite] = useState({
    eventId: "",
    title: "",
    names: "",
    adminId: "4",
    adminName: "",
  });
  const [buyForId, setBuyForId] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [usersTakingPart, setUsersTakingPart] = useState([]);
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
          // setEventData(data[0].Event);
          console.log("get event data");
          console.log(data[0].Event);
          setEventData({
            title: data[0].Event.title,
            exchange_date: data[0].Event.exchange_date,
            budget: data[0].Event.budget,
            adminId: data[0].Event.AdminId,
          });
          setEventId(data[0].EventId);
          if (data[0].BuyFor) {
            setBuyForId(data[0].BuyFor.first_name);
          }
          if (data[0].EventId) {
            axios
              .get(`${MY_EVENTS_URL}/eventid/${data[0].EventId}`)
              .then((data2) => {
                console.log("get user taking part");
                setUsersTakingPart(
                  data2.data.map((item) => item.User.first_name)
                );
              })
              .catch(() => {
                // setAlert({
                //   message: "You currently aren't in an event",
                //   isSuccess: false,
                // });
              });
          }
        })
        .catch(() => {
          // setAlert({
          //   message: "You currently aren't in an event",
          //   isSuccess: false,
          // });
        });
    }
  }, [userId, eventId, setUsersTakingPart]);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const handleCodeChange = (event) => {
    setEventCode(event.target.value);
  };

  const handleCodeEnter = () => {
    axios
      .get(`http://localhost:3000/events/${eventCode}`)
      .then(({ data }) => {
        setEventInvite({
          eventId: data[0].id,
          title: data[0].title,
          names: data[0].participants,
          adminId: data[0].adminId,
          adminName: data[0].Admin.first_name,
        });
      })
      .catch(() => {
        setAlert({
          message: "Wrong code, please try again",
          isSuccess: false,
        });
      });
  };

  const chooseName = (item) => {
    const newNameList = eventInvite.names
      .split(", ")
      .filter((name) => name !== item)
      .join(", ");
    setEventInvite({ ...eventInvite, names: newNameList });
    axios
      .patch(`http://localhost:3000/events/${eventInvite.eventId}`, {
        participants: newNameList,
      })
      .then(() => {
        console.log("you have been added to the event");
      })
      .catch(() => {
        setAlert({
          message: "server not working, please try again later",
          isSuccess: false,
        });
      });
    axios
      .post(MY_EVENTS_URL, {
        UserId: userId,
        BuyForId: null,
        EventId: 1,
      })
      .then(() => {
        console.log("added user to the event");
        setEventId(eventInvite.eventId);
      })
      .catch(() => {
        setAlert({
          message: "server not working, please try again later",
          isSuccess: false,
        });
      });
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
      {userId === eventData.adminId && (
        <div>
          <Link className="my-events-link" to="/eventadmin">
            <div>Edit Events</div>
          </Link>
        </div>
      )}
      <Alert message={alert.message} success={alert.isSuccess} />
      {eventId ? (
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
                type="date"
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
            {buyForId && (
              <div className="event-data-card">
                You are buying for...
                <div>{buyForId}</div>
              </div>
            )}
            <div className="event-data-card">
              <div className="event-data-tag">participants:</div>
              {usersTakingPart &&
                usersTakingPart.map((item) => (
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
              <div>from {eventInvite.adminName}</div>
              {eventInvite.names.split(", ").map((item) => (
                <button
                  key={item}
                  type="submit"
                  onClick={() => chooseName(item)}
                >
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
