import React, { useEffect, useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import SidebarFriends from "./SidebarFriends";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
function FriendSection({ setBurgerMenu }) {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const { baseURL, user } = useGlobalContext();
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput);
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${baseURL}api/users`,
        { id: user?.id },
        { headers: "content-type: text/json" }
      )
      .then((res) => {
        setPeople(res.data);
        setLoading(false);
      });
    axios
      .post(
        `${baseURL}api/users/followers`,
        { id: user?.id },
        { headers: "content-type: text/json" }
      )
      .then((res) => {
        setFollowers(res.data);
        setLoading(false);
      });
  }, [user?.id]);
  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`);
  };
  return (
    <section>
      <header>
        <div className="chat-burger-cont" onClick={() => setBurgerMenu(true)}>
          <div className="ghost"></div>
          <GiHamburgerMenu id="debug-id" className="burger" />
        </div>
        <span>People</span>
        <ul>
          <li>
            <div>
              <RiUserAddLine className="chat-section-btn" />
            </div>
          </li>
        </ul>
      </header>
      <form>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          autoFocus={true}
          type="text"
          placeholder="Search People"
        />
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
        {followers.length > 0 && !searchInput ? (
          <div className="follower-people">
            <h3>People you may know</h3>
            {followers.map((el) => {
              return (
                <SidebarFriends
                  onClick={() => handleViewProfile(el._id)}
                  key={el?._id}
                  active={true}
                  email={el?.email}
                  title={el?.username}
                  pfp={`${baseURL}images/${el?.picture.split("\\")[1]}`}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}
        {!searchInput && (
          <ul>
            <div className="all-people">
              <h3>Random People</h3>
              {people.map((el) => {
                return (
                  <SidebarFriends
                    onClick={() => handleViewProfile(el._id)}
                    key={el?._id}
                    active={true}
                    email={el?.email}
                    title={el?.username}
                    pfp={`${baseURL}images/${el?.picture.split("\\")[1]}`}
                  />
                );
              })}
            </div>
          </ul>
        )}
        {searchInput && (
          <ul>
            <div className="all-people">
              <h3>Random People</h3>
              {people.map((el) => {
                if (
                  el.username.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                  return (
                    <SidebarFriends
                      onClick={() => handleViewProfile(el._id)}
                      key={el?._id}
                      active={true}
                      email={el?.email}
                      title={el?.username}
                      pfp={`${baseURL}images/${el?.picture.split("\\")[1]}`}
                    />
                  );
                }
              })}
            </div>
          </ul>
        )}
      </div>
    </section>
  );
}

export default FriendSection;
