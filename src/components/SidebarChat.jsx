import React from "react";

function SidebarChat({ title, message, pfp, date, active }) {
  return (
    <li className="sidebar-chat-user">
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
