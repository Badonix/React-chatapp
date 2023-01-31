import React from "react";
import { useEffect } from "react";
import SidebarChat from "./SidebarChat";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useGlobalContext } from "../context";

function ChatSection() {
  const { user, baseURL, following, setCurrentChat } = useGlobalContext();
  useEffect(() => {
    console.log(following);
  }, [following]);
  return (
    <section className="chat-section">
      <header>
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
                name={el.username}
                uid={el._id}
                setCurrentChat={setCurrentChat}
                active={false}
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
