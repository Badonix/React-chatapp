import React from "react";

function SentMessage({ message }) {
  return (
    <div className="sent-message">
      <div className="sent-message-cont">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default SentMessage;
