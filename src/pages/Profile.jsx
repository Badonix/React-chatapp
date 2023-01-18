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
  const { user, setUser, baseURL } = useGlobalContext();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      axios
        .get(`${baseURL}api/users/${localStorage.getItem("id")}`)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        });
    }
    if (id == localStorage.getItem("id")) {
      setIsCurrentUser(true);
    }
  }, []);
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
        {isCurrentUser && (
          <Link to="/edit">
            <AiOutlineEdit className="edit-icon" />
          </Link>
        )}

        <img
          src={`${baseURL}images/${user?.picture.split("\\")[1]}`}
          className="profile-pfp"
        />
        <h2>{user?.username}</h2>
        <h3>{user?.email}</h3>
        <p>Friends: 19</p>
      </div>
    </section>
  );
}

export default Profile;
