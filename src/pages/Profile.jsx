import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
function Profile() {
  const { user, image, baseURL } = useGlobalContext();
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
          <AiOutlineHome className="go-back-icon" />
        </Link>
        <Link to="/edit">
          <AiOutlineEdit className="edit-icon" />
        </Link>
        <img
          src={`${baseURL}images/${user.picture.split("\\")[1]}`}
          className="profile-pfp"
        />
        <h2>{user.username}</h2>
        <h3>{user.email}</h3>
        <p>Friends: 19</p>
      </div>
    </section>
  );
}

export default Profile;
