import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
function Notification({ username, picture, senderId }) {
  const { baseURL } = useGlobalContext();
  return (
    <>
      {username && senderId && picture ? (
        <Link to={`profile/${senderId}`}>
          <article className="notification">
            <img src={`${baseURL}images/${picture?.split("\\")[1]}`} />
            <p>{username} followed you!</p>
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
