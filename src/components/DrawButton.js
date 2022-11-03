import React, { useState } from "react";
import axios from "axios";
import "../styles/createevent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminCard from "./AdminCard";

const DrawButton = () => {
  if (eventData.participants.split("").length === 0) {
    console.log(eventData.participants.split("").length);
  }
};

export default DrawButton;
