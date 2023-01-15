import React from "react";
import { Link } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
function Signup() {
  const navigate = useNavigate();
  const [pfp, setPfp] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pfpUrl, setPfpurl] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useGlobalContext();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword == password && pfp) {
      console.log(confirmPassword, password, pfp, email, username);
      const formData = {
        email,
        password,
        username,
        picture: pfp,
      };
      setLoading(true);
      axios
        .post("http://localhost:4000/api/users/signup", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);

          console.log(error);
          setError(error.response.data);
        });
    }
  };
  const handleFileChange = (e) => {
    setPfp(e.target.files[0]);
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setPfpurl(e.target.result);
    };
  };
  // console.log(pfp);
  return (
    <form onSubmit={handleFormSubmit} className="user-form">
      <div className="form-container">
        <div className={Error ? "error-cont on" : "error-cont"}>{Error}</div>
        <h2>Register</h2>
        <div className="input-container">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoFocus={true}
            type="text"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
          />
          <input
            onChange={handleFileChange}
            id="img-inp"
            style={{ display: "none" }}
            type="file"
            accept="image/jpeg, image/png, image/jpg"
          />
          <label htmlFor="img-inp" className="image-upload">
            <BsUpload className="ima-upload-icon" />
            <p>Upload Profile Picture</p>
          </label>
          {pfpUrl && <img className="uploaded-img-preview" src={pfpUrl} />}
        </div>
        <div className="button-div">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <button type="submit">Register</button>
          )}
          <span>
            <Link to="/login">Log in</Link> instead
          </span>
        </div>
      </div>
    </form>
  );
}

export default Signup;
