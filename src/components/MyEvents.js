/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/myevents.scss";
import axios from "axios";
import Alert from "./Alert";
import AdminCard from "./AdminCard";
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
  const [buyForLikes, setBuyForLikes] = useState("");
  const [buyForDislikes, setBuyForDislikes] = useState("");
  const [usersTakingPart, setUsersTakingPart] = useState([]);
  const [editEvent, setEditEvent] = useState(false);
  const [userEventId, setUserEventId] = useState("");
  const [isSure, setIsSure] = useState(false);
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
          setUserEventId(data[0].id);
          if (data[0].BuyFor) {
            setBuyForId(data[0].BuyFor.first_name);
            console.log("BUYFOR", data[0].BuyFor.first_name);
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
  }, [userId, setUsersTakingPart]);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextEvent = (e) => {
    const nextEventIndex = currentIndex + 1;
    if (currentIndex < dataArray.length) {
      e.preventDefault();
      setCurrentIndex(nextEventIndex);
      if (dataArray[nextEventIndex].BuyFor) {
        setBuyForId(dataArray[nextEventIndex].BuyFor.first_name);
        console.log("BUYFOR", dataArray[nextEventIndex].BuyFor.first_name);
        setBuyForLikes(dataArray[nextEventIndex].BuyFor.likes);
        setBuyForDislikes(dataArray[nextEventIndex].BuyFor.dislikes);
        console.log("buyfor", dataArray[nextEventIndex].BuyFor.first_name);
      } else {
        setBuyForId("");
      }
      setEventData(dataArray[nextEventIndex].Event);
      setUserEventId(dataArray[nextEventIndex].id);
      console.log(
        "data length",
        dataArray.length,
        "curent index",
        nextEventIndex
      );
      if (dataArray[nextEventIndex].EventId) {
        axios
          .get(`${MY_EVENTS_URL}/eventid/${dataArray[nextEventIndex].EventId}`)
          .then((data2) => {
            console.log("get user taking part");
            setUsersTakingPart(data2.data.map((item) => item.User.first_name));
          })
          .catch(() => {
            // setAlert({
            //   message: "You currently aren't in an event",
            //   isSuccess: false,
            // });
          });
      }
    }
  };

  const prevEvent = (e) => {
    try {
      if (currentIndex >= 0) {
        e.preventDefault();
        const prevEventIndex = currentIndex - 1;
        setCurrentIndex(prevEventIndex);
        if (dataArray[prevEventIndex].BuyFor) {
          setBuyForId(dataArray[prevEventIndex].BuyFor.first_name);
          console.log("BUYFOR", dataArray[prevEventIndex].BuyFor.first_name);
          setBuyForLikes(dataArray[prevEventIndex].BuyFor.likes);
          setBuyForDislikes(dataArray[prevEventIndex].BuyFor.dislikes);
          console.log("buyfor", dataArray[prevEventIndex].BuyFor.first_name);
        } else {
          setBuyForId("");
        }
        setEventData(dataArray[prevEventIndex].Event);
        setUserEventId(dataArray[prevEventIndex].id);
        if (dataArray[prevEventIndex].EventId) {
          axios
            .get(
              `${MY_EVENTS_URL}/eventid/${dataArray[prevEventIndex].EventId}`
            )
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const handleLeaveEvent = () => {
    if (!isSure) {
      setIsSure(true);
    } else if (isSure) {
      axios
        .delete(`${MY_EVENTS_URL}/${userEventId}`)
        .then(() => {
          changeLocation("/");
        })
        .catch(() => {
          setAlert({
            message: "server not working, please try again later",
            isSuccess: false,
          });
        });
    }
  };

  return (
    <div className="my-events-container">
      {userId === eventData.AdminId && (
        <div>
          {editEvent ? (
            <button
              type="button"
              onClick={() => {
                setEditEvent(!editEvent);
              }}
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEventId(eventData.id);
                setEditEvent(!editEvent);
              }}
            >
              Edit Events
            </button>
          )}
        </div>
      )}
      {editEvent ? (
        <AdminCard eventId={eventId} usersTakingPart={usersTakingPart} />
      ) : (
        <div>
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
                    Suggestions from them
                    <div className="field-tag">likes</div>
                    {buyForLikes &&
                      buyForLikes.split(", ").map((item) => (
                        <div className="like-container" key={item}>
                          <div className="field-value" />
                          {item}
                        </div>
                      ))}
                    <div className="field-tag">dislikes</div>
                    {buyForDislikes &&
                      buyForDislikes.split(", ").map((item) => (
                        <div className="like-container" key={item}>
                          <div className="field-value" />
                          {item}
                        </div>
                      ))}
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
              <div className="field-card">
                {isSure && (
                  <div className="delete-confirm-message">
                    Are you sure you want to leave this event?
                  </div>
                )}
                <button
                  type="submit"
                  onClick={handleLeaveEvent}
                  disabled={eventData.drawn}
                >
                  {isSure ? "confirm" : "leave event"}
                </button>
              </div>
              <button
                type="button"
                onClick={nextEvent}
                disabled={currentIndex + 1 === dataArray.length}
              >
                NEXT
              </button>
              <div className="previous-button">
                <button
                  type="button"
                  onClick={prevEvent}
                  disabled={currentIndex === 0}
                >
                  PREVIOUS
                </button>
              </div>
            </div>
          ) : (
            <div>no events</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
