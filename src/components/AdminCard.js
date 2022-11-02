/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import "../styles/admincard.scss";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthProvider";
import Alert from "./Alert";

const ADMIN_CARD_URL = "http://localhost:3000/userevents";

const AdminCard = () => {
    const { userId } = useAuthContext();

    const initialState = {
        fields: {
            title: "",
            exchange_date: "",
            budget: "",
            participants: "",
            adminId: userId,
        },
        alert: {
            message: "",
            isSuccess: false,
        },
    };
    const [eventData, setEventData] = useState(initialState.fields);
    const [alert, setAlert] = useState(initialState.alert);
    const [notEditable, setNotEditable] = useState(true);

    useEffect(() => {
        axios.get(`${ADMIN_CARD_URL}/userid/${userId}`).then(({ data }) => {
            console.log(data);
            console.log(data[0].Event);
            setEventData(data[0].Event);
        });
    }, [userId, eventData.AdminId]);

    const handleChange = (event) => {
        setEventData({ ...eventData, [event.target.name]: event.target.value });
    };

    const handleChangeOfEventDetails = () => {
        axios
            .patch(`http://localhost:3000/events/${eventData.id}`, {
                title: eventData.title,
                exchange_date: eventData.exchange_date,
                budget: eventData.budget,
                participants: eventData.participants,
                adminId: eventData.adminId,
            })
            .then(() => {
                setAlert({
                    message: "Details have been updated",
                    isSuccess: true,
                });
                console.log("Details  have been updated");
                setNotEditable(true);
            })
            .catch(() => {
                setAlert({
                    message: "Server error, please try again later",
                    isSuccess: false,
                });
            });
    };

    return (
        <div className="admin-card-container">
            <Alert message={alert.message} success={alert.isSuccess} />

            <div>
                <div className="admin-card-title">Admin Card</div>

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
                            readOnly={notEditable}
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
                            readOnly={notEditable}
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
                            readOnly={notEditable}
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
                                        onChange={handleChange}
                                        readOnly={notEditable}
                                    />
                                </div>
                            ))}
                    </div>
                    {notEditable ? (
                        <button type="submit" onClick={() => setNotEditable(false)}>
                            edit
                        </button>
                    ) : (
                        <button type="submit" onClick={handleChangeOfEventDetails}>
                            save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCard;
