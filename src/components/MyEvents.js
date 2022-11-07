/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/myevents.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
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
  const [eventCode, setEventCode] = useState("");
  const [eventInvite, setEventInvite] = useState(initialState.Event);
  const [usersTakingPart, setUsersTakingPart] = useState([]);
  const [editEvent, setEditEvent] = useState(false);
  const [userEventId, setUserEventId] = useState("");
  const [isSure, setIsSure] = useState(false);
  // const [isDrawn, setIsDrawn] = useState(false);
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
          // setIsDrawn(data[0].Event.drawn);
          setUserEventId(data[0].id);
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
        setBuyForLikes(dataArray[nextEventIndex].BuyFor.likes);
        setBuyForDislikes(dataArray[nextEventIndex].BuyFor.dislikes);
        console.log("buyfor", dataArray[nextEventIndex].BuyFor.first_name);
      } else {
        setBuyForId("");
      }
      setEventData(dataArray[nextEventIndex].Event);
      // setIsDrawn(dataArray[nextEventIndex].Event)
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
          // deleted from database correctly but not rerendering the page
          console.log("user removed from the event, userEventId", userEventId);
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
        <div className="edit-button">
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
                <div
                  className="event-data-card"
                  onChange={handleChange}
                  id="event-budget"
                >
                  Budget: £{`${eventData.budget}`}
                </div>
                {buyForId && (
                  <div className="event-data-card">
                    <h4>You are buying for...</h4>
                    <div className="buy-for">{buyForId}</div>
                    <br />
                    <h4>Suggestions from them</h4>
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
                  <h4 className="event-data-tag">Participants:</h4>
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
          <div className="field-card">
            {isSure && (
              <div className="delete-confirm-message">
                Are you sure you want to leave this event?
              </div>
            )}
            <div>
              <div>
                <button
                  className="event-button"
                  type="submit"
                  onClick={handleLeaveEvent}
                  disabled={eventData.drawn}
                >
                  {isSure ? "confirm" : "leave event"}
                </button>
              </div>
              <div className="previous">
                <button
                  className="event-button"
                  type="button"
                  onClick={prevEvent}
                  disabled={currentIndex === 0}
                >
                  <FontAwesomeIcon icon={faLeftLong} />
                </button>
              </div>
            </div>
            <div className="next">
              <button
                className="event-button"
                type="button"
                onClick={nextEvent}
                disabled={currentIndex + 1 === dataArray.length}
              >
                <FontAwesomeIcon icon={faRightLong} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
