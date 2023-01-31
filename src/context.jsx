import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [currentImg, setCurrentImg] = useState();
  const [currentName, setCurrentName] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const baseURL = "http://localhost:4000/";
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      axios
        .get(`${baseURL}api/users/${localStorage.getItem("id")}`)
        .then((res) => {
          setUser(res.data);
        });
      axios
        .post(`${baseURL}api/users/followings`, {
          id: localStorage.getItem("id"),
        })
        .then((res) => setFollowing(res.data))
        .catch((error) => console.log(error.message));
    } else {
    }
  }, []);
  useEffect(() => {
    console.log(currentChat, currentImg, currentName);
  }, [currentChat, currentImg, currentName]);
  return (
    <AppContext.Provider
      value={{
        currentChat,
        onlineUsers,
        setOnlineUsers,
        setCurrentChat,
        setCurrentImg,
        currentImg,
        setCurrentName,
        currentName,
        baseURL,
        user,
        setUser,
        following,
        image,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
