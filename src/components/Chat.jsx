import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { TbSend } from "react-icons/tb";
import { useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import SentMessage from "./SentMessage";
import RecievedMessage from "./RecievedMessage";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import axios from "axios";
function Chat({ setBurgerMenu, socket }) {
  const { baseURL, currentImg, currentName, currentChat } = useGlobalContext();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .post(`${baseURL}api/users/messages`, {
        userId: localStorage.getItem("id"),
        senderId: currentChat,
      })
      .then((res) => setMessages(res.data));
  }, [currentChat]);

  var handleSendMessage = () => {
    if (inputValue) {
      const newMessages = [
        ...messages,
        {
          content: inputValue,
          receiverId: currentChat,
          senderId: localStorage.getItem("id"),
        },
      ];

      socket.emit("new-message", {
        senderId: localStorage.getItem("id"),
        receiverId: currentChat,
        content: inputValue,
      });
      setMessages(newMessages);
      setInputValue("");
    }
  };

  useEffect(() => {
    const el = document.querySelector(".chat-body");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      data["senderId"] = data["sender"];
      data["receiverId"] = data["receiver"];
      delete data["sender"];
      delete data["receiver"];
      data.receiverId = localStorage.getItem("id");
      setMessages((prevMessages) => {
        return [...prevMessages, data];
      });
    });
    return () => {
      socket.off("recieve-message");
    };
  }, [socket]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (inputValue) {
        const newMessages = [
          ...messages,
          {
            content: inputValue,
            receiverId: currentChat,
            senderId: localStorage.getItem("id"),
          },
        ];
        setMessages(newMessages);
        socket.emit("new-message", {
          sender: localStorage.getItem("id"),
          receiver: currentChat,
          content: inputValue,
        });
        setInputValue("");
      }
    }
  };
  return (
    <>
      <div className="chat-header">
        <div className="chat-burger-cont" onClick={() => setBurgerMenu(true)}>
          <div className="ghost"></div>
          <GiHamburgerMenu id="debug-id" className="burger" />
        </div>
        <div className="chat-user">
          <img src={`${baseURL}${currentImg}`} />
          <h2>{currentName}</h2>
        </div>
        <Link to={"/profile/" + currentChat}>
          <div className="chat-profile-icon-cont">
            <BsFillPersonFill className="chat-profile-icon" />
          </div>
        </Link>
      </div>
      <div className="chat-body">
        {messages?.map((el, index) => {
          if (
            el.senderId == localStorage.getItem("id") &&
            el.receiverId == currentChat
          ) {
            return <SentMessage key={index} message={el.content} />;
          } else if (el.senderId == currentChat) {
            return (
              <RecievedMessage
                photo={currentImg}
                key={index}
                message={el.content}
              />
            );
          }
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
