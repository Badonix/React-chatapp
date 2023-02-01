import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../context";
function RecievedMessage({ message, photo }) {
  const [show, setShow] = useState(false);
  const { baseURL } = useGlobalContext();
  const handleShowDate = () => {
    setShow((prev) => !prev);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  return (
    <div className="recieved-message">
      <img src={`${baseURL}${photo}`} className="recieved-pfp" />
      <div onClick={handleShowDate} className="recieved-message-cont">
        <p>{message}</p>
        <span
          className={show ? "recieved-date show-recieved" : "recieved-date"}
        >
          12:41
        </span>
      </div>
    </div>
  );
}

export default RecievedMessage;
