import React from "react";
import FriendSection from "../components/FriendSection";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import ChatSection from "../components/ChatSection";
import Chat from "../components/Chat";
import Layout from "./Layout";
function Messenger({ newFollower, setNewFollower, socket }) {
  const [currentSection, setCurrentSection] = useState("chat");
  const [burgerMenu, setBurgerMenu] = useState(false);

  return (
    <>
      <Layout setNewFollower={setNewFollower} newFollower={newFollower} />
      <div className="msngr">
        <Sidebar
          burgerMenu={burgerMenu}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          setBurgerMenu={setBurgerMenu}
        />
        {currentSection == "chat" ? (
          <ChatSection
            setCurrentSection={setCurrentSection}
            setBurgerMenu={setBurgerMenu}
            className="chat-section"
          />
        ) : currentSection == "friends" ? (
          <FriendSection
            setBurgerMenu={setBurgerMenu}
            className="friend-section"
          />
        ) : (
          ""
        )}
        <main>
          <Chat socket={socket} setBurgerMenu={setBurgerMenu} />
        </main>
      </div>
    </>
  );
}

export default Messenger;
