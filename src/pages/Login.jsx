import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { user, setUser, baseURL } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = { username, password };
    axios
      .post(`${baseURL}api/users/login`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        setUser(response.data);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(error.response.data);
      });
  };
  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="user-form">
      <div className="form-container">
        <div className={error ? "error-cont on" : "error-cont"}>{error}</div>

        <h2>Login</h2>
        <div className="input-container">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoFocus={true}
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="button-div">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <button type="submit">Log in</button>
          )}
          <span>
            <Link to="/signup">Register</Link> instead
          </span>
        </div>
      </div>
    </form>
  );
}

export default Login;
