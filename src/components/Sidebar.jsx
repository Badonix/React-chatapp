import React, { useRef } from "react";
import { BsChatSquare } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import img from "../images/logo.png";
import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
function Sidebar({
  currentSection,
  setCurrentSection,
  setBurgerMenu,
  burgerMenu,
}) {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
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
    localStorage.removeItem("user");
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
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
  console.log(user);
  return (
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
              currentSection == "chat"
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
              src={`${baseURL}images/${user?.picture.split("\\")[1]}`}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
