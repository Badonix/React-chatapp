import React from "react";
import { useEffect } from "react";
import SidebarChat from "./SidebarChat";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useGlobalContext } from "../context";
import { GiHamburgerMenu } from "react-icons/gi";

function ChatSection({ setCurrentSection, setBurgerMenu }) {
  const { user, baseURL, following, setCurrentChat, onlineUsers } =
    useGlobalContext();
  return (
    <section className="chat-section">
      <header>
        <div className="chat-burger-cont" onClick={() => setBurgerMenu(true)}>
          <div className="ghost"></div>
          <GiHamburgerMenu id="debug-id" className="burger" />
        </div>
        <span>Chats</span>
        <ul>
          <li>
            <div>
              <AiOutlinePlus className="chat-section-btn" />
            </div>
          </li>
          <li>
            <div>
              <MdOutlineGroupAdd className="chat-section-btn" />
            </div>
          </li>
        </ul>
      </header>
      <form>
        <input autoFocus={true} type="text" placeholder="Search chats" />
      </form>
      <div className="sidebar-chats">
        <ul>
          {following.map((el) => {
            return (
              <SidebarChat
                pic={el.picture}
                setCurrentSection={setCurrentSection}
                name={el.username}
                uid={el._id}
                setCurrentChat={setCurrentChat}
                active={onlineUsers.includes(el._id)}
                title={el.username}
                message="Hello, how are you?"
                pfp={`${baseURL}images/${el?.picture.split("\\")[1]}`}
                date="12:41"
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ChatSection;
