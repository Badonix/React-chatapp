import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import Follower from "../components/Follower";
function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otherUser, setOtherUser] = useState();
  const [loading, setLoading] = useState(false);
  const { user, setUser, baseURL } = useGlobalContext();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState();
  const [toggleFollowers, setToggleFollowers] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      setLoading(true);
      axios.get(`${baseURL}api/users/${id}`).then((res) => {
        setOtherUser(res.data);
        console.log(otherUser);
        setFollowing(res.data.following.length);
        setFollowers(res.data.followers.length);
        setLoading(false);
        if (res.data.followers.includes(localStorage.getItem("id"))) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      });
    }
    if (id == localStorage.getItem("id")) {
      setIsCurrentUser(true);
    }
    console.log(otherUser);
  }, []);

  const handleFollow = (id) => {
    if (isFollowed) return;
    axios
      .post(`${baseURL}api/users/follow`, {
        userId: localStorage.getItem("id"),
        followToId: id,
      })
      .then((res) => {
        console.log(res);
        const newOtherUser = Object.assign({}, otherUser, {
          followers: otherUser.followers.concat(id),
        });
        setOtherUser(newOtherUser);
        setFollowers((prev) => prev + 1);
      });
    setIsFollowed(true);
  };

  const handleUnFollow = (id) => {
    axios
      .post(`${baseURL}api/users/unfollow`, {
        userId: localStorage.getItem("id"),
        userToUnfollowId: id,
      })
      .then((res) => {
        console.log(res);
        setFollowers((prev) => prev - 1);

        setOtherUser((prevState) => {
          let obj = { ...prevState }; // create a copy of the object
          let index = obj.followers.indexOf(id); // find the index of the id to remove
          if (index !== -1) obj.followers.splice(index, 1); // remove the id if it exists in the array
          setIsFollowed(false);
          return obj;
        });
      });
    console.log(otherUser);
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
      {toggleFollowers && (
        <div className="view-followers-cont">
          <div className="view-followers">
            <div className="top-row-followers">
              <div></div>
              <h2>Followers</h2>
              <GrClose
                onClick={() => {
                  setToggleFollowers(false);
                }}
                className="close-icon"
              />
            </div>
            <div className="followers-cont">
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
              <Follower />
            </div>
          </div>
        </div>
      )}
      <div className="profilepage-container">
        <Link to="/">
          <AiOutlineHome className="go-back-icon" />
        </Link>
        {isCurrentUser && !loading ? (
          <Link to="/edit">
            <AiOutlineEdit className="edit-icon" />
          </Link>
        ) : isFollowed ? (
          <button
            onClick={() => handleUnFollow(otherUser.id)}
            className="unfollow-btn"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={() => handleFollow(otherUser.id)}
            className="follow-btn"
          >
            Follow
          </button>
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
            <p
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setToggleFollowers(true);
              }}
            >
              Followers: {followers}
            </p>
            <p
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setToggleFollowers(true);
              }}
            >
              Following: {following}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
