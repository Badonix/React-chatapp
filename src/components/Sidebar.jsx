import React, { useRef } from "react";
import { BsChatSquare } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import img from "../images/logo.png";
import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { RiNotification4Line } from "react-icons/ri";
import Notification from "./Notification";
import axios from "axios";
function Sidebar({
  currentSection,
  setCurrentSection,
  setBurgerMenu,
  burgerMenu,
}) {
  const [dropDown, setDropDown] = useState(false);
  const [notifShowing, setNotifShowing] = useState(false);
  const dropdownRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const { user, setUser, image, baseURL } = useGlobalContext();
  const handleClick = (event) => {
    if (!dropDown) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }
  };
  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    const navigate = useNavigate();
    navigate("/login");
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    axios
      .get(`${baseURL}api/users/notifs/${localStorage.getItem("id")}`)
      .then((res) => setNotifications([res.data]))
      .catch((e) => console.log(e));
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const ref = useRef(null);
  useClickOutside(ref, () => {
    if (burgerMenu) {
      setBurgerMenu(false);
    }
  });
  return (
    <>
      <aside ref={ref} className={burgerMenu ? "sidebar showing" : "sidebar"}>
        <div className="top-sidebar">
          <div className="close-btn-cont">
            <RiCloseFill
              onClick={() => setBurgerMenu(false)}
              className="close-btn"
            />
          </div>

          <div className="logo-container">
            <img src={img} />
          </div>
          <div className="navigation-icons">
            <div
              onClick={() => {
                setCurrentSection("chat");
                setBurgerMenu(false);
              }}
              className={
                currentSection == "chat" || !currentSection
                  ? "new-notif nav-icon-cont active"
                  : "new-notif nav-icon-cont"
              }
            >
              <BsChatSquare className="nav-icon" />
            </div>
            <div
              onClick={() => {
                setCurrentSection("friends");
                setBurgerMenu(false);
              }}
              className={
                currentSection == "friends"
                  ? "new-notif nav-icon-cont active"
                  : "new-notif nav-icon-cont"
              }
            >
              <BsPerson className="nav-icon" />
            </div>
            <div
              onClick={() => setNotifShowing(true)}
              className="nav-icon-cont"
            >
              <RiNotification4Line className="notification-icon" />
            </div>
          </div>
          <div
            className={
              !notifShowing
                ? "notification-cont"
                : "notification-cont notif-activee"
            }
          >
            <div className="not-top-row-cont">
              <div></div>
              <h2>Notifications</h2>
              <RiCloseFill
                onClick={() => setNotifShowing(false)}
                className="close-btn"
              />
            </div>
            <div className="notif-cont">
              {notifications[0]?.length ? (
                notifications[0]?.map((el) => {
                  return (
                    <Notification
                      time={el?.updatedAt}
                      picture={el?.picture}
                      senderId={el?.senderId}
                      username={el?.username}
                    />
                  );
                })
              ) : (
                <div className="empty-notifs">
                  <p>You have no notifications :(</p>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Searchtool_right.svg/1200px-Searchtool_right.svg.png" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bottom-sidebar">
          <div className="navigation-icons">
            {dropDown && (
              <div className="profile-dropdown">
                <Link to={`/profile/${user?.id}`}>
                  {" "}
                  <p>Profile</p>
                </Link>
                <div className="dropdown-line"></div>
                <Link onClick={handleLogout}>
                  <p className="logout">Log out</p>
                </Link>
              </div>
            )}
            <div
              ref={dropdownRef}
              onClick={() => setDropDown((prev) => !prev)}
              className="nav-icon-cont profile-cont"
            >
              <img
                className="nav-profile-image"
                src={`${baseURL}images/${user?.picture?.split("\\")[1]}` || ""}
              />
            </div>
          </div>
        </div>
      </aside>
      {notifShowing && (
        <div
          onClick={() => setNotifShowing(false)}
          className="notif-background-ghost"
        ></div>
      )}
    </>
  );
}

export default Sidebar;
