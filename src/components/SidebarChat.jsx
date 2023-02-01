import React from "react";
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
  return (
    <li
      onClick={() => {
        handleChatChange(uid, pic, name);
        setCurrentSection("");
      }}
      className="sidebar-chat-user"
    >
      <div className="chat--user-pfp-cont">
        <img className="sidebar-chat-user-pfp" src={pfp} />
        {active && <div className="active-user"></div>}
      </div>
      <div className="sidebar-chat-user-text">
        <h5>{title}</h5>
        <p>{message}</p>
      </div>
      <div className="sidebar-chat-user-info">
        <p>{date}</p>
      </div>
    </li>
  );
}

export default SidebarChat;
