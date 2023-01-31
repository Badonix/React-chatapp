import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import Layout from "./Layout";
import Follower from "../components/Follower";
function Profile({ socket, newFollower, setNewFollower }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otherUser, setOtherUser] = useState();
  const [loading, setLoading] = useState(false);
  const { baseURL } = useGlobalContext();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followingCount, setFollowingCount] = useState();
  const [followersCount, setFollowersCount] = useState();
  const [toggleFollowers, setToggleFollowers] = useState(false);
  const [toggleFollowings, setToggleFollowings] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      setLoading(true);
      axios.get(`${baseURL}api/users/${id}`).then((res) => {
        setOtherUser(res.data);
        setFollowingCount(res.data.following.length);
        setFollowersCount(res.data.followers.length);
        setLoading(false);
        if (res.data.followers.includes(localStorage.getItem("id"))) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      });
      //get followers
      axios.post(`${baseURL}api/users/followers`, { id: id }).then((res) => {
        setFollowers(res.data);
      });
      axios.post(`${baseURL}api/users/followings`, { id: id }).then((res) => {
        setFollowings(res.data);
      });
    }
    if (id == localStorage.getItem("id")) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [id]);

  const handleFollow = (id) => {
    if (isFollowed) return;
    axios
      .post(`${baseURL}api/users/follow`, {
        userId: localStorage.getItem("id"),
        followToId: id,
      })
      .then((res) => {
        const newOtherUser = Object.assign({}, otherUser, {
          followers: otherUser.followers.concat(id),
        });
        setOtherUser(newOtherUser);
        setFollowersCount((prev) => prev + 1);
        socket.emit("followUser", {
          followToId: id,
          followerId: localStorage.getItem("id"),
        });
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
        setFollowersCount((prev) => prev - 1);

        setOtherUser((prevState) => {
          let obj = { ...prevState }; // create a copy of the object
          let index = obj.followers.indexOf(id); // find the index of the id to remove
          if (index !== -1) obj.followers.splice(index, 1); // remove the id if it exists in the array
          setIsFollowed(false);
          return obj;
        });
      });
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
        {toggleFollowers && (
          <div className="view-followers-cont">
            <div
              onClick={() => setToggleFollowers(false)}
              className="invis-prof"
            ></div>
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
                {followers.length > 0 ? (
                  followers.map((el) => {
                    return (
                      <Follower
                        setToggleFollowers={setToggleFollowers}
                        setToggleFollowings={setToggleFollowings}
                        username={el.username}
                        picture={el.picture}
                        mgId={el._id}
                        key={el._id}
                      />
                    );
                  })
                ) : (
                  <div>
                    <h3>User has no followers :(</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {toggleFollowings && (
          <div className="view-followers-cont">
            <div
              onClick={() => setToggleFollowings(false)}
              className="invis-prof"
            ></div>
            <div className="view-followers">
              <div className="top-row-followers">
                <div></div>
                <h2>Followings</h2>
                <GrClose
                  onClick={() => {
                    setToggleFollowings(false);
                  }}
                  className="close-icon"
                />
              </div>
              <div className="followers-cont">
                {followings.length > 0 ? (
                  followings.map((el) => {
                    return (
                      <Follower
                        setToggleFollowers={setToggleFollowers}
                        setToggleFollowings={setToggleFollowings}
                        username={el.username}
                        picture={el.picture}
                        mgId={el._id}
                        key={el._id}
                      />
                    );
                  })
                ) : (
                  <div>
                    <h3>User is not following anybody :(</h3>
                  </div>
                )}
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
                Followers: {followersCount}
              </p>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setToggleFollowings(true);
                }}
              >
                Following: {followingCount}
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Profile;
