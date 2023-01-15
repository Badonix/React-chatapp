import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SlPicture } from "react-icons/sl";
import { AiOutlineHome } from "react-icons/ai";
import { useGlobalContext } from "../context";
function Edit() {
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
        <Link to="/profile">
          <FaRegAddressCard className="edit-icon" />
        </Link>
        <div className="edit-image-cont">
          <img src={`${baseURL}images/${image}`} className="profile-pfp" />
          <div htmlFor="update-image" className="edit-image-overlay">
            <label htmlFor="update-image">
              <SlPicture className="update-image-icon" />
              Upload
            </label>
            <input
              id="update-image"
              style={{ display: "none" }}
              type="file"
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
        </div>
        <div className="edit-input-cont">
          <input type="text" placeholder={user.username} />
          <input type="text" placeholder={user.email} />
        </div>
        <button className="save-edits">Save</button>
      </div>
    </section>
  );
}

export default Edit;
