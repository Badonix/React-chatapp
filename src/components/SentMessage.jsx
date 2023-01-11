import React from "react";
import { useState } from "react";
function SentMessage({ message }) {
  const [show, setShow] = useState(false);

  const handleShowDate = () => {
    setShow((prev) => !prev);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  return (
    <div className="sent-message">
      <div onClick={handleShowDate} className="sent-message-cont">
        <p>
          <span className={show ? "sent-date show-sent" : "sent-date"}>
            12:41
          </span>
          {message}
        </p>
      </div>
    </div>
  );
}

export default SentMessage;
