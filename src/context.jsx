import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const baseURL = "http://localhost:4000/";
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  useEffect(() => {
    user ? setImage(user.picture.split("\\")[1]) : "";
  }, [user]);
  return (
    <AppContext.Provider value={{ baseURL, user, setUser, image }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
