import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
function Layout({ newFollower, setNewFollower }) {
  const [notifMessage, setNotifMessage] = useState("");

  const { baseURL } = useGlobalContext();
  useEffect(() => {
    if (newFollower) {
      axios.get(`${baseURL}api/users/${newFollower}`).then((res) => {
        setNotifMessage(res.data);
        setTimeout(() => {
          setNotifMessage("");
          setNewFollower("");
        }, 4000);
      });
    }
  }, [newFollower]);

  return (
    <>
      {notifMessage && (
        <div>
          <div className="notif-popup">
            {notifMessage && (
              <img
                src={`${baseURL}images/${notifMessage?.picture.split("\\")[1]}`}
                alt="zd"
              />
            )}

            <p>
              <span>{notifMessage.username}</span> just followed you!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
