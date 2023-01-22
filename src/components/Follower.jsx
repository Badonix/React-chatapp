import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
function Follower({
  username,
  picture,
  mgId,
  setToggleFollowers,
  setToggleFollowings,
}) {
  const { baseURL } = useGlobalContext();
  const handleReset = () => {
    setToggleFollowers(false);
    setToggleFollowings(false);
  };
  return (
    <Link onClick={handleReset} to={`/profile/${mgId}`}>
      <div className="follower">
        <img src={`${baseURL}${picture.split("\\"[1])}`} />
        <h2>{username}</h2>
        <div></div>
      </div>
    </Link>
  );
}

export default Follower;
