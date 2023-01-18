import React from "react";
import { useState } from "react";

function RecievedMessage() {
  const [show, setShow] = useState(false);

  const handleShowDate = () => {
    setShow((prev) => !prev);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  return (
    <div className="recieved-message">
      <img
        src="https://i.pinimg.com/736x/13/0f/96/130f9601ce0b948996e13bc2b1d88a66.jpg"
        className="recieved-pfp"
      />
      <div onClick={handleShowDate} className="recieved-message-cont">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quod
          ipsa dolorem officia, provident, quaerat odio perspiciatis eum
          voluptate maxime aut ea modi magni? Reiciendis odit pariatur dolorum
          qui incidunt.
        </p>
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
