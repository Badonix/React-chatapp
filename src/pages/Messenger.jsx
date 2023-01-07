import React from "react";
import { BsChatSquare } from "react-icons/bs";
import img from "../images/logo.png";
import { BsPerson } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineGroupAdd } from "react-icons/md";
import SidebarChat from "../components/SidebarChat";
function Messenger() {
  return (
    <div className="msngr">
      <aside>
        <div className="top-sidebar">
          <div className="logo-container">
            <img src={img} />
          </div>
          <div className="navigation-icons">
            <div className="new-notif nav-icon-cont active">
              <BsChatSquare className="nav-icon" />
            </div>
            <div className="new-notif nav-icon-cont">
              <BsPerson className="nav-icon" />
            </div>
          </div>
        </div>
        <div className="bottom-sidebar">
          <div className="navigation-icons">
            <div className="nav-icon-cont">
              <BsMoon className="nav-icon" />
            </div>
            <div className="nav-icon-cont profile-cont">
              <img
                className="nav-profile-image"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
            </div>
          </div>
        </div>
      </aside>
      <section>
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
          <input type="text" placeholder="Search chats" />
        </form>
        <div className="sidebar-chats">
          <ul>
            <SidebarChat
              active={true}
              title="John Smith"
              message="Hello, how are you?"
              pfp="https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"
              date="12:41"
            />

            <SidebarChat
              active={true}
              title="Elon Musk"
              message="Tesla tesla tesla tesla tesla"
              pfp="https://static01.nyt.com/images/2022/12/15/business/00ROOSE-MUSK-top/00ROOSE-MUSK-top-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
              date="12:30"
            />

            <SidebarChat
              active={false}
              title="Lasha Gelovani"
              message="Me vin var?"
              pfp="https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg"
              date="11:28"
            />

            <SidebarChat
              active={true}
              title="Gi Gi"
              message="zd male moxvxal?"
              pfp="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              date="10:12"
            />

            <SidebarChat
              active={false}
              title="Anonymous"
              message="123 test"
              pfp="https://i.pinimg.com/736x/5a/e5/98/5ae598ff624217b9a5c008beb8c512d0.jpg"
              date="14:41"
            />
          </ul>
        </div>
      </section>
      <main></main>
    </div>
  );
}

export default Messenger;
