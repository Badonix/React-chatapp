import React from "react";
import { useRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { TbSend } from "react-icons/tb";
import { useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import SentMessage from "./SentMessage";
import RecievedMessage from "./RecievedMessage";
function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleSendMessage = () => {
    if (inputValue) {
      setMessages((prev) => [...prev, { message: inputValue }]);
      setInputValue("");
      const el = document.querySelector(".chat-body");
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (inputValue) {
        setMessages((prev) => [...prev, { message: inputValue }]);
        setInputValue("");
        const el = document.querySelector(".chat-body");
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      }
    }
  };

  return (
    <>
      <div className="chat-header">
        <div className="chat-user">
          <img src="data:image/jpeg;base64,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" />
          <h2>Eminem</h2>
        </div>
        <div className="chat-profile-icon-cont">
          <BsFillPersonFill className="chat-profile-icon" />
        </div>
      </div>
      <div className="chat-body">
        <RecievedMessage />
        {messages.map((el) => {
          return <SentMessage message={el.message} />;
        })}
        <div className="dummy"></div>
      </div>
      <div className="chat-footer">
        <input
          onKeyDown={handleKeyDown}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Write a message..."
          type="text"
        />
        <div className="chat-footer-buttons-cont">
          <RiAttachment2 className="chat-footer-btn" />
        </div>
        <div
          onClick={handleSendMessage}
          className="chat-footer-buttons-cont send-btn"
        >
          <TbSend className="chat-footer-btn " />
        </div>
      </div>
    </>
  );
}

export default Chat;
