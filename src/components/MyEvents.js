/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/myevents.scss";
import axios from "axios";
import Alert from "./Alert";
import { useAuthContext } from "../contexts/AuthProvider";

const MY_EVENTS_URL = "http://localhost:3000/userevents";

const MyEvents = () => {
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
  const [eventId, setEventId] = useState("");
  const [dataArray, setDataArray] = useState(initialState.Event);
  const [buyForId, setBuyForId] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [eventInvite, setEventInvite] = useState(initialState.Event);
  const [usersTakingPart, setUsersTakingPart] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`${MY_EVENTS_URL}/userid/${userId}`)
        .then(({ data }) => {
          setEventData(data[0].Event);
          setDataArray(data);
          console.log("data", data);
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
          adminId: data[0].AdminId,
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
    console.log({ eventInvite });
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
        EventId: eventInvite.eventId,
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

  return (
    <div className="my-events-container">
      {userId === eventData.AdminId && (
        <div>
          <Link className="my-events-link" to="/eventadmin">
            <div>Edit Events</div>
          </Link>
        </div>
      )}
      <Alert message={alert.message} success={alert.isSuccess} />
      {eventId ? (
        <div>
          <div className="my-events-title">
            <h1>My Events</h1>
          </div>
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
            {buyForId && (
              <div className="event-data-card">
                You are buying for...
                <div>{buyForId}</div>
              </div>
            )}
            <div className="event-data-card">
              <div className="event-data-tag">Participants:</div>
              {usersTakingPart &&
                usersTakingPart.map((item) => (
                  <div className="like-container" key={item}>
                    {item}
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
      <button type="button" onClick={nextEvent} disabled={false}>
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

export default MyEvents;
