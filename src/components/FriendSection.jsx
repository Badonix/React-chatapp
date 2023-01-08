import React from "react";
import { RiUserAddLine } from "react-icons/ri";
import SidebarFriends from "./SidebarFriends";
function FriendSection() {
  return (
    <section>
      <header>
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
        <ul>
          <SidebarFriends
            active={true}
            bio={"Im Elon musk!"}
            title={"Elon Musk"}
            pfp={
              "https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
            }
          />
          <SidebarFriends
            active={true}
            bio={"Im Elon musk!"}
            title={"Elon Musk"}
            pfp={
              "https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
            }
          />
          <SidebarFriends
            active={true}
            bio={"Im Elon musk!"}
            title={"Elon Musk"}
            pfp={
              "https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
            }
          />
          <SidebarFriends
            active={true}
            bio={"Im Elon musk!"}
            title={"Elon Musk"}
            pfp={
              "https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
            }
          />
          <SidebarFriends
            active={true}
            bio={"Im Elon musk!"}
            title={"Elon Musk"}
            pfp={
              "https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
            }
          />
          <SidebarFriends
            active={true}
            bio={"Im Elon musk!"}
            title={"Elon Musk"}
            pfp={
              "https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
            }
          />
          <SidebarFriends
            active={true}
            bio={"Im Elon musk!"}
            title={"Elon Musk"}
            pfp={
              "https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
            }
          />
          <SidebarFriends
            active={true}
            bio={"Im Elon musk!"}
            title={"Elon Musk"}
            pfp={
              "https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
            }
          />
        </ul>
      </div>
    </section>
  );
}

export default FriendSection;
