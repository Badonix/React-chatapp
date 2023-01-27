import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import { useGlobalContext } from "./context";
import Layout from "./pages/Layout";
import { io } from "socket.io-client";
function App() {
  const { user, setUser, image } = useGlobalContext();
  const [authenticated, setAuthenticated] = useState(false);
  const [newFollower, setNewFollower] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token && id) {
      setAuthenticated(true);
    }
  }, [user]);
  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token && id) {
      socket?.emit("new-user", id);
    }
    socket?.on("followNotif", (followerId) => {
      setNewFollower(followerId);
    });
  }, [socket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <Messenger
                setNewFollower={setNewFollower}
                newFollower={newFollower}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={!authenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:id"
          element={
            <Profile
              setNewFollower={setNewFollower}
              newFollower={newFollower}
              socket={socket}
            />
          }
        />
        <Route
          path="/edit"
          element={
            authenticated ? (
              <Edit setNewFollower={setNewFollower} newFollower={newFollower} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
