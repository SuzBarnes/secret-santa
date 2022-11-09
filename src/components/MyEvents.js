/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/myevents.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightLong,
  faLeftLong,
  faGift,
  faCheck,
  faTrashCan,
  faXmark,
  faGifts,
  faSleigh,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";
import AdminCard from "./AdminCard";
import AddSuggestions from "./AddSuggestions";
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
  const [reveal, setReveal] = useState(false);
  const { userId } = useAuthContext();
  const [eventData, setEventData] = useState(initialState.Event);
  const [eventId, setEventId] = useState("");
  const [dataArray, setDataArray] = useState(initialState.Event);
  const [buyForId, setBuyForId] = useState("");
  const [buyForLikes, setBuyForLikes] = useState("");
  const [buyForDislikes, setBuyForDislikes] = useState("");
  const [buyForSuggestions, setBuyForSuggestions] = useState("");
  const [usersTakingPart, setUsersTakingPart] = useState([]);
  const [editEvent, setEditEvent] = useState(false);
  const [userEventId, setUserEventId] = useState("");
  const [isSure, setIsSure] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isNameClickedOn, setIsNameClickedOn] = useState(false);
  const [nameToAddSuggestion, setNameToAddSuggestion] = useState({
    userId: "",
    firstName: "",
  });
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
            setBuyForSuggestions(data[0].BuyFor.suggestions);
            console.log("BUYFOR", data[0].BuyFor.first_name);
            setBuyForLikes(data[0].BuyFor.likes);
            setBuyForDislikes(data[0].BuyFor.dislikes);
          }
          if (data[0].EventId) {
            axios
              .get(`${MY_EVENTS_URL}/eventid/${data[0].EventId}`)
              .then((data2) => {
                console.log("get user taking part");
                const filterUserOut = data2.data
                  .map((item) => {
                    return {
                      userId: item.User.id,
                      firstName: item.User.first_name,
                    };
                  })
                  .filter((name) => name.firstName !== data[0].User.first_name);
                console.log("USER ARRAY OF OBJECTS", filterUserOut);
                setUsersTakingPart(filterUserOut);
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
        setBuyForSuggestions(dataArray[nextEventIndex].BuyFor.suggestions);
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
            const filterUserOut = data2.data
              .map((item) => {
                return {
                  userId: item.User.id,
                  firstName: item.User.first_name,
                };
              })
              .filter(
                (name) =>
                  name.firstName !== dataArray[nextEventIndex].User.first_name
              );
            setUsersTakingPart(filterUserOut);
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
          setBuyForSuggestions(dataArray[prevEventIndex].BuyFor.suggestions);
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
              const filterUserOut = data2.data
                .map((item) => {
                  return {
                    userId: item.User.id,
                    firstName: item.User.first_name,
                  };
                })
                .filter(
                  (name) =>
                    name.firstName !== dataArray[prevEventIndex].User.first_name
                );
              setUsersTakingPart(filterUserOut);
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

  const handleReveal = () => {
    document.getElementById("gift-icon").style.transform = "scale(2)";
    setTimeout(() => {
      console.log("test");
      setReveal(true);
    }, 500);
  };

  return (
    <div className="my-events-container">
      {userId === eventData.AdminId && (
        <div>
          {editEvent ? (
            <button
              className="edit-button"
              type="button"
              onClick={() => {
                setEditEvent(!editEvent);
              }}
            >
              Back
            </button>
          ) : (
            <button
              className="edit-button"
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
              <div className="my-events-title">{/* <h1>My Events</h1> */}</div>
              <div className="event-data-container">
                <div className="event-data-card">
                  <h1>{eventData.title}</h1>
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
                    <div className="reveal">
                      {!reveal ? (
                        <button
                          type="button"
                          id="gift-icon"
                          onClick={() => {
                            handleReveal();
                          }}
                        >
                          <FontAwesomeIcon icon={faGift} />
                        </button>
                      ) : (
                        <div className="buy-for">{buyForId}</div>
                      )}
                    </div>

                    <div>
                      <div>Suggestions from others:</div>
                      <button
                        type="button"
                        onClick={() => setIsRevealed(!isRevealed)}
                      >
                        {isRevealed ? "Hide" : "Show"}
                      </button>
                      {isRevealed && (
                        <ul>
                          {buyForSuggestions &&
                            buyForSuggestions
                              .split(", ")
                              .map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      )}
                    </div>
                    <h4>Ideas from them</h4>
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
                {isNameClickedOn ? (
                  <AddSuggestions nameToAddSuggestion={nameToAddSuggestion} />
                ) : (
                  <div className="event-data-card">
                    <h4 className="event-data-tag">Participants:</h4>
                    {usersTakingPart &&
                      usersTakingPart.map((item) => (
                        <button
                          className="like-container"
                          key={item.firstName}
                          type="button"
                          onClick={() => {
                            setIsNameClickedOn(true);
                            console.log("ITEM BEFORE PASSED AS PROP", item);
                            setNameToAddSuggestion(item);
                          }}
                        >
                          {item.firstName}
                        </button>
                      ))}
                  </div>
                )}
              </div>
              {isSure && (
                <div className="delete-confirm-message">
                  Are you sure you want to leave this event?
                </div>
              )}
              <div className="field-card">
                <button
                  className="event-button leave-button"
                  type="submit"
                  onClick={handleLeaveEvent}
                  disabled={eventData.drawn}
                >
                  {isSure ? (
                    <FontAwesomeIcon icon={faCheck} className="font-awesome" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="font-awesome"
                    />
                  )}
                </button>
                {isSure && (
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setIsSure(false)}
                  >
                    <FontAwesomeIcon icon={faXmark} className="font-awesome" />
                  </button>
                )}
                <button
                  className="event-button previous"
                  type="button"
                  onClick={prevEvent}
                  disabled={currentIndex === 0}
                >
                  <FontAwesomeIcon icon={faLeftLong} />
                </button>
              </div>
              <button
                className="event-button next"
                type="button"
                onClick={nextEvent}
                disabled={currentIndex + 1 === dataArray.length}
              >
                <FontAwesomeIcon icon={faRightLong} />
              </button>
            </div>
          ) : (
            <div className="no-events-div">
              <h1>Slow down Rudolph!</h1>
              <p>You need to Create or Join an event first!</p>
              <div className="font-awesome-icon">
                <FontAwesomeIcon
                  className="font-awesome-icon"
                  icon={faSleigh}
                />
                <FontAwesomeIcon className="font-awesome-icon" icon={faGifts} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
