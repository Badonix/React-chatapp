import React from "react";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
function SidebarChat({
  title,
  uid,
  setCurrentChat,
  message,
  pfp,
  pic,
  date,
  active,
  name,
  setCurrentSection,
}) {
  const { setCurrentImg, setCurrentName } = useGlobalContext();
  const handleChatChange = (uid, img, name) => {
    setCurrentChat(uid);
    setCurrentImg(img);
    setCurrentName(name);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <li
      onClick={() => {
        handleChatChange(uid, pic, name);
        setCurrentSection("msg");
      }}
      className="sidebar-chat-user"
    >
      <div className="chat--user-pfp-cont">
        <img className="sidebar-chat-user-pfp" src={pfp} />
        {active && <div className="active-user"></div>}
      </div>
      <div className="sidebar-chat-user-text">
        <h5>{title}</h5>
      </div>
      <div className="sidebar-chat-user-info">
        <p>{date}</p>
      </div>
    </li>
  );
}

export default SidebarChat;
