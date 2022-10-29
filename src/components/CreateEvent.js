import React from "react";
import "../styles/createevent.scss";

const CreateEvent = () => {
  return (
    <div className="create-event">
      <form className="create-event-form">
        <input className="create-event-title" type="text" placeholder="Title" />
        <input
          className="create-event-price"
          type="number"
          placeholder="Price Limit"
        />
        <input
          id="test"
          className="create-event-exchange-date"
          type="date"
          placeholder="Exchange Date"
        />
      </form>
    </div>
  );
};
export default CreateEvent;
