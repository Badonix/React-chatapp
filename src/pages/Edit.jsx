import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SlPicture } from "react-icons/sl";
import { AiOutlineHome } from "react-icons/ai";
import { useGlobalContext } from "../context";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Edit() {
  const { user, image, baseURL, setUser } = useGlobalContext();
  const [emailUpdated, setEmailUpdated] = useState();
  const [usernameUpdated, setUsernameUpdated] = useState();
  const [imageUpdated, setImageUpdated] = useState();
  const navigate = useNavigate();
  const handleProfileUpdate = () => {
    if (emailUpdated || usernameUpdated) {
      const formData = {
        usernameUpdated: usernameUpdated || user.username,
        emailUpdated: emailUpdated || user.email,
        id: user.id,
      };
      axios
        .put(`${baseURL}api/users/edit`, formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(usernameUpdated, emailUpdated);
          console.log(res.data);
          setUser({
            email: res.data.email,
            username: res.data.username,
            token: user.token,
            picture: user.picture,
            id: user.id,
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(formData);
          console.log(error);
        });
    }
  };
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
          <input
            value={usernameUpdated}
            onChange={(e) => setUsernameUpdated(e.target.value)}
            type="text"
            placeholder={user.username}
          />
          <input
            value={emailUpdated}
            onChange={(e) => setEmailUpdated(e.target.value)}
            type="text"
            placeholder={user.email}
          />
        </div>
        <button onClick={handleProfileUpdate} className="save-edits">
          Save
        </button>
      </div>
    </section>
  );
}

export default Edit;
