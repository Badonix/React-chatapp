import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Messenger from "./pages/Messenger";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messenger />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
