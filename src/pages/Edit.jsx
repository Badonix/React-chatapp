import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SlPicture } from "react-icons/sl";
import { AiOutlineHome } from "react-icons/ai";
import { useGlobalContext } from "../context";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
function Edit({ newFollower, setNewFollower }) {
  const { user, image, baseURL, setUser } = useGlobalContext();
  const [emailUpdated, setEmailUpdated] = useState();
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameUpdated, setUsernameUpdated] = useState();
  const [file, setFile] = useState();
  const [otherUser, setOtherUser] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      setLoading(true);
      axios
        .get(`${baseURL}api/users/${localStorage.getItem("id")}`)
        .then((res) => {
          setOtherUser(res.data);
          setUser(res.data);
          setLoading(false);
        });
    }
  }, []);
  const handleProfileUpdate = (e) => {
    setError("");
    e.preventDefault();

    if (emailUpdated || usernameUpdated || file) {
      setLoading(true);
      setError(false);
      const formData = new FormData();
      formData.append("usernameUpdated", usernameUpdated || user.username);
      formData.append("emailUpdated", emailUpdated || user.email);
      formData.append("id", user.id);
      formData.append("photo", file);
      axios
        .put(`${baseURL}api/users/edit`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setLoading(false);
          setUser({
            email: res.data.email,
            username: res.data.username,
            token: user.token,
            picture: res.data.picture,
            id: user.id,
          });
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data.error);
        });
    } else {
      setError("Fill in all fields!");
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setFileUrl(e.target.result);
    };
  };
  return (
    <>
      <Layout setNewFollower={setNewFollower} newFollower={newFollower} />

      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <form
          onSubmit={(e) => handleProfileUpdate(e)}
          className="profilepage-container"
          style={{
            position: "relative",
          }}
        >
          <div className={Error ? "error-cont on" : "error-cont"}>{Error}</div>

          <Link to="/">
            <AiOutlineHome className="go-back-icon" />
          </Link>
          <Link to="/profile">
            <FaRegAddressCard className="edit-icon" />
          </Link>
          <div className="edit-image-cont">
            <img
              src={
                fileUrl ||
                `${baseURL}images/${otherUser?.picture?.split("\\")[1]}`
              }
              className="profile-pfp"
            />
            <div htmlFor="update-image" className="edit-image-overlay">
              <label htmlFor="update-image">
                <SlPicture className="update-image-icon" />
                Upload
              </label>
              <input
                onChange={(e) => handleFileChange(e)}
                id="update-image"
                style={{ display: "none" }}
                name="profilePicture"
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
              placeholder={otherUser?.username}
            />
            <input
              value={emailUpdated}
              onChange={(e) => setEmailUpdated(e.target.value)}
              type="text"
              placeholder={otherUser?.email}
            />
          </div>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <button type={"submit"} className="save-edits">
              Save
            </button>
          )}
        </form>
      </section>
    </>
  );
}

export default Edit;
