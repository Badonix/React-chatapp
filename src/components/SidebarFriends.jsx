import React from "react";

function SidebarFriends({ title, email, pfp, active, onClick }) {
  return (
    <li onClick={onClick} className="sidebar-chat-user">
      <div className="chat--user-pfp-cont">
        <img className="sidebar-chat-user-pfp" src={pfp} />
        {active && <div className="active-user"></div>}
      </div>
      <div className="sidebar-chat-user-text">
        <h5>{title}</h5>
        <p>{email}</p>
      </div>
    </li>
  );
}
export default SidebarFriends;
