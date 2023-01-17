import React, { useEffect, useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import SidebarFriends from "./SidebarFriends";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useGlobalContext } from "../context";
function FriendSection({ setBurgerMenu }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const { baseURL, user } = useGlobalContext();
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${baseURL}api/users`,
        { id: user.id },
        { headers: "content-type: text/json" }
      )
      .then((res) => {
        setPeople(res.data);
        setLoading(false);
      });
  }, [user.id]);
  return (
    <section>
      <header>
        <div className="chat-burger-cont" onClick={() => setBurgerMenu(true)}>
          <div className="ghost"></div>
          <GiHamburgerMenu id="debug-id" className="burger" />
        </div>
        <span>Friends</span>
        <ul>
          <li>
            <div>
              <RiUserAddLine className="chat-section-btn" />
            </div>
          </li>
        </ul>
      </header>
      <form>
        <input autoFocus={true} type="text" placeholder="Search Friends" />
      </form>
      <div className="sidebar-chats">
        {loading && (
          <div className="loading-cont">
            <div className="load-1">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        )}
        <ul>
          {people.map((el) => {
            return (
              <SidebarFriends
                key={el._id}
                active={true}
                email={el.email}
                title={el.username}
                pfp={`${baseURL}images/${el.picture.split("\\")[1]}`}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default FriendSection;
