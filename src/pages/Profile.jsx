import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otherUser, setOtherUser] = useState();
  const [loading, setLoading] = useState(false);
  const { user, setUser, baseURL } = useGlobalContext();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      setLoading(true);
      axios.get(`${baseURL}api/users/${id}`).then((res) => {
        setOtherUser(res.data);
        console.log(otherUser);
        setLoading(false);
      });
    }
    if (id == localStorage.getItem("id")) {
      setIsCurrentUser(true);
      setUser(otherUser);
    }
  }, []);
  useEffect(() => {
    console.log(otherUser);
  }, [otherUser]);
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
        {isCurrentUser && !loading ? (
          <Link to="/edit">
            <AiOutlineEdit className="edit-icon" />
          </Link>
        ) : (
          <button className="follow-btn">Follow</button>
        )}

        <img
          src={
            !loading
              ? `${baseURL}images/${otherUser?.picture.split("\\")[1]}`
              : "https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP-300x300.jpg"
          }
          className="profile-pfp"
        />
        {!loading ? (
          <>
            <h2>{otherUser?.username}</h2>
            <h3>{otherUser?.email}</h3>
          </>
        ) : (
          <>
            <div className="username-placeholder"></div>
            <div className="email-placeholder"></div>
          </>
        )}
        {loading ? (
          <>
            <p className="followers-placeholder"></p>
            <p className="followers-placeholder"></p>
          </>
        ) : (
          <>
            <p>Followers: {otherUser?.followers}</p>
            <p>Following: {otherUser?.following}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
