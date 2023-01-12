import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messenger />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
