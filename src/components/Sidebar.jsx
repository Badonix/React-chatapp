import React, { useRef } from "react";
import { BsChatSquare } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import img from "../images/logo.png";
import { useEffect } from "react";
import { useState } from "react";
function Sidebar({ currentSection, setCurrentSection }) {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const handleClick = (event) => {
    if (!dropDown) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <aside>
      <div className="top-sidebar">
        <div className="logo-container">
          <img src={img} />
        </div>
        <div className="navigation-icons">
          <div
            onClick={() => setCurrentSection("chat")}
            className={
              currentSection == "chat"
                ? "new-notif nav-icon-cont active"
                : "new-notif nav-icon-cont"
            }
          >
            <BsChatSquare className="nav-icon" />
          </div>
          <div
            onClick={() => setCurrentSection("friends")}
            className={
              currentSection != "chat"
                ? "new-notif nav-icon-cont active"
                : "new-notif nav-icon-cont"
            }
          >
            <BsPerson className="nav-icon" />
          </div>
        </div>
      </div>
      <div className="bottom-sidebar">
        <div className="navigation-icons">
          {dropDown && (
            <div className="profile-dropdown">
              <p>Profile</p>
              <div className="dropdown-line"></div>
              <p className="logout">Log out</p>
            </div>
          )}
          <div
            ref={dropdownRef}
            onClick={() => setDropDown((prev) => !prev)}
            className="nav-icon-cont profile-cont"
          >
            <img
              className="nav-profile-image"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
