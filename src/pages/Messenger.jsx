import React from "react";
import FriendSection from "../components/FriendSection";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import ChatSection from "../components/ChatSection";
import Chat from "../components/Chat";
import Layout from "./Layout";
function Messenger({ newFollower, setNewFollower, socket }) {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [currentSection, setCurrentSection] = useState("chat");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Layout setNewFollower={setNewFollower} newFollower={newFollower} />
      <div className="msngr">
        <Sidebar
          setCurrentSection={setCurrentSection}
          burgerMenu={burgerMenu}
          setBurgerMenu={setBurgerMenu}
          currentSection={currentSection}
        />

        {currentSection == "chat" && (
          <ChatSection
            setCurrentSection={setCurrentSection}
            setBurgerMenu={setBurgerMenu}
            className="chat-section"
          />
        )}
        {currentSection == "friends" && (
          <FriendSection
            setBurgerMenu={setBurgerMenu}
            className="friend-section"
          />
        )}
        {screenWidth > 1200 &&
          (currentSection != "friends") & (currentSection != "chat") && (
            <ChatSection
              setCurrentSection={setCurrentSection}
              setBurgerMenu={setBurgerMenu}
              className="chat-section"
            />
          )}
        <main>
          <Chat socket={socket} setBurgerMenu={setBurgerMenu} />
        </main>
      </div>
    </>
  );
}

export default Messenger;
