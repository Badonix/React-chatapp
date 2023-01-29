import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
function Notification({ username, picture, senderId, time }) {
  const { baseURL } = useGlobalContext();
  function timeSince(date) {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + "s ago";
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + "m ago";
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + "h ago";
    }
    if (secondsPast > 86400 && date.getDate() !== now.getDate()) {
      return parseInt(secondsPast / 86400) + "d ago";
    }
    if (secondsPast > 604800) {
      return parseInt(secondsPast / 604800) + "w ago";
    }
    if (secondsPast > 2629800) {
      return parseInt(secondsPast / 2629800) + "mo ago";
    }
    return parseInt(secondsPast / 31536000) + "y ago";
  }
  const updatedT = new Date(time);

  return (
    <>
      {username && senderId && picture ? (
        <Link to={`profile/${senderId}`}>
          <article className="notification">
            <div className="left-notif-cont">
              <img src={`${baseURL}images/${picture?.split("\\")[1]}`} />
              <p>{username} followed you!</p>
            </div>
            <p className="date">{timeSince(updatedT)}</p>
          </article>
        </Link>
      ) : (
        <div className="empty-notifs">
          <p>You have no notifications :(</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Searchtool_right.svg/1200px-Searchtool_right.svg.png" />
        </div>
      )}
    </>
  );
}

export default Notification;
