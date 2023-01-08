import React from "react";
import FriendSection from "../components/FriendSection";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import ChatSection from "../components/ChatSection";
import Chat from "../components/Chat";
function Messenger() {
  const [currentSection, setCurrentSection] = useState("chat");

  return (
    <div className="msngr">
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      {currentSection == "chat" ? <ChatSection /> : <FriendSection />}
      <main>
        <Chat />
      </main>
    </div>
  );
}

export default Messenger;
