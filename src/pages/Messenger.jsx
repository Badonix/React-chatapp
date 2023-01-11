import React from "react";
import FriendSection from "../components/FriendSection";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import ChatSection from "../components/ChatSection";
import Chat from "../components/Chat";
function Messenger() {
  const [currentSection, setCurrentSection] = useState("chat");
  const [burgerMenu, setBurgerMenu] = useState(false);

  return (
    <div className="msngr">
      <Sidebar
        burgerMenu={burgerMenu}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        setBurgerMenu={setBurgerMenu}
      />
      {currentSection == "chat" ? (
        <ChatSection className="chat-section" />
      ) : (
        <FriendSection
          setBurgerMenu={setBurgerMenu}
          className="friend-section"
        />
      )}
      <main>
        <Chat setBurgerMenu={setBurgerMenu} />
      </main>
    </div>
  );
}

export default Messenger;
