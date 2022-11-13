/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/joinevent.scss";
import axios from "axios";
import Alert from "./Alert";
import { useAuthContext } from "../contexts/AuthProvider";

const MY_EVENTS_URL = "http://localhost:3000/userevents";

const JoinEvent = () => {
  const { userId } = useAuthContext();
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
  const [eventCode, setEventCode] = useState("");
  const [eventInvite, setEventInvite] = useState(initialState.Event);
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  });
  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const componentWillRedirect = () => {
    setAlert({
      message: "You have been added to the event!",
      isSuccess: true,
    });
    setTimeout(() => {
      changeLocation("/");
    }, 3000);
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`${MY_EVENTS_URL}/userid/${userId}`)
        .then(({ data }) => {
          if (data[0].EventId) {
            axios
              .get(`${MY_EVENTS_URL}/eventid/${data[0].EventId}`)
              .catch(() => {
                setAlert({
                  message: "You currently aren't in an event",
                  isSuccess: false,
                });
              });
          }
        })
        .catch(() => {
          setAlert({
            message: "You currently aren't in an event",
            isSuccess: false,
          });
        });
    }
  }, [userId]);
  const handleCodeChange = (event) => {
    setEventCode(event.target.value);
  };

  const handleCodeEnter = () => {
    axios
      .get(`http://localhost:3000/events/${eventCode}`)
      .then(({ data }) => {
        if (data[0].drawn) {
          setAlert({
            message:
              "Sorry, this event has already been drawn and can no longer be joined",
            isSuccess: false,
          });
        } else {
          setEventInvite({
            eventId: data[0].id,
            title: data[0].title,
            names: data[0].participants,
            adminId: data[0].AdminId,
            adminName: data[0].Admin.first_name,
          });
          setAlert({
            message: "",
            isSuccess: false,
          });
        }
      })
      .catch(() => {
        setAlert({
          message: "Wrong code, please try again",
          isSuccess: false,
        });
      });
  };

  const chooseName = (item) => {
    let isJoined = false;
    axios
      .get(`${MY_EVENTS_URL}/eventid/${eventInvite.eventId}/userid/${userId}`)
      .then(({ data }) => {
        if (data.length === 0) {
          isJoined = false;
        } else if (data.length > 0) {
          isJoined = true;
          setAlert({
            message: "You have already joined this event!",
            isSuccess: false,
          });
        }
        if (isJoined === false) {
          if (item) {
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
                setAlert({
                  message: "You have been added to the event!!",
                  isSuccess: false,
                });
              })
              .catch(() => {
                setAlert({
                  message: "Server error, please try again later",
                  isSuccess: false,
                });
              });
          }
          axios
            .post(MY_EVENTS_URL, {
              UserId: userId,
              BuyForId: null,
              EventId: eventInvite.eventId,
            })
            .then(() => {
              componentWillRedirect();
            })
            .catch(() => {
              setAlert({
                message: "Server error, please try again later",
                isSuccess: false,
              });
            });
        }
      })

      .catch(
        setAlert({
          message: "Server error, please try again later",
          isSuccess: false,
        })
      );
  };

  return (
    <div className="join-event">
      {eventInvite.eventId ? (
        <div>
          <h3>Merry Christmas!</h3>
          <div>
            {eventInvite.adminName} has invited you to {eventInvite.title}.
          </div>
          <p>Click your name to join in the fun!</p>
          <button type="button" onClick={() => chooseName("")}>
            Forgotten?
          </button>
          {eventInvite.names &&
            eventInvite.names.split(", ").map((item) => (
              <button key={item} type="submit" onClick={() => chooseName(item)}>
                {item}
              </button>
            ))}

          <Alert message={alert.message} isSuccess={alert.isSuccess} />
        </div>
      ) : (
        <div>
          <p>Enter your invite code to join your friends:</p>
          <label htmlFor="code">
            <input
              className="code"
              id="code"
              name="code"
              placeholder="Event Code"
              type="text"
              value={eventCode}
              onChange={handleCodeChange}
            />
          </label>
          <button type="submit" onClick={handleCodeEnter} data-testid="join">
            Join!
          </button>
          <Alert message={alert.message} isSuccess={alert.isSuccess} />
        </div>
      )}
    </div>
  );
};

export default JoinEvent;
