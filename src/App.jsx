import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import { useGlobalContext } from "./context";
function App() {
  const { user, setUser, image } = useGlobalContext();
  useEffect(() => {
    console.log(user);
    console.log(image);
  }, [user]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Messenger /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit"
          element={user ? <Edit /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
