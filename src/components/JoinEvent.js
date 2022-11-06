import React, { useState } from "react";
import "../styles/joinevent.scss";
import axios from "axios";
import Alert from "./Alert";

import { useAuthContext } from "../contexts/AuthProvider";

const MY_EVENTS_URL = "http://localhost3000/userevents";

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
  const [eventId, setEventId] = useState("");
  // const [buyForId, setBuyForId] = useState("");
  // const [eventData, setEventData] = useState(initialState.Event);
  // const [usersTakingPart, setUsersTakingPart] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  });

  // useEffect(() => {
  //   if (userId) {
  //     axios
  //       .get(`${MY_EVENTS_URL}/userid/${userId}`)
  //       .then(({ data }) => {
  //         // setEventData(data[0].Event);
  //         // setBuyForId(data[0].BuyFor.first_name);
  //         setEventId(data[0].EventId);
  //         // if (data[0].BuyFor) {
  //         // setBuyForId(data[0].BuyFor.first_name);
  //         // }
  //         if (data[0].EventId) {
  //           axios
  //             .get(`${MY_EVENTS_URL}/eventid/${data[0].EventId}`)
  //             // .then((data2) => {
  //             //   setUsersTakingPart(
  //             //     data2.data.map((item) => item.User.first_name)
  //             //   );
  //             // })
  //             .catch(() => {
  //               setAlert({
  //                 message: "You currently aren't in an event",
  //                 isSuccess: false,
  //               });
  //             });
  //         }
  //       })
  //       .catch(() => {
  //         setAlert({
  //           message: "You currently aren't in an event",
  //           isSuccess: false,
  //         });
  //       });
  //   }
  // }, [userId, eventId]);
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
    <div>
      {eventInvite.eventId ? (
        <div>
          <div>{eventInvite.title}</div>
          <div>from {eventInvite.adminName}</div>
          {eventInvite.names.split(", ").map((item) => (
            <button key={item} type="submit" onClick={() => chooseName(item)}>
              {item}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <Alert message={alert.message} success={alert.isSuccess} />
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
          <button type="submit" onClick={handleCodeEnter}>
            Join!
          </button>
        </div>
      )}
    </div>
  );
};

export default JoinEvent;
