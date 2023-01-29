import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const baseURL = "http://localhost:4000/";
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      axios
        .get(`${baseURL}api/users/${localStorage.getItem("id")}`)
        .then((res) => {
          setUser(res.data);
        });
    } else {
    }
  }, []);
  useEffect(() => {
    console.log(onlineUsers);
  }, [onlineUsers]);

  return (
    <AppContext.Provider
      value={{
        currentChat,
        onlineUsers,
        setOnlineUsers,
        setCurrentChat,
        baseURL,
        user,
        setUser,
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
