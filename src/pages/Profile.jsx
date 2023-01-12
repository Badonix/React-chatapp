import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
function Profile() {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className="profilepage-container">
        <Link to="/">
          <MdOutlineKeyboardBackspace className="go-back-icon" />
        </Link>
        <Link to="/edit">
          <AiOutlineEdit className="edit-icon" />
        </Link>
        <img
          src="https://pbs.twimg.com/media/FgYA_RAWQAEWCw3.jpg"
          className="profile-pfp"
        />
        <h2>Nick Dane</h2>
        <h3>
          About me over here chilling biling About me over here chilling biling
          About me over here chilling biling
        </h3>
        <p>Friends: 19</p>
      </div>
    </section>
  );
}

export default Profile;
