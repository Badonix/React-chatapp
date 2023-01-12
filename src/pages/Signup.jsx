import React from "react";
import { Link } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <form onSubmit={handleFormSubmit} className="user-form">
      <div className="form-container">
        <h2>Register</h2>
        <div className="input-container">
          <input placeholder="Username" autoFocus={true} type="text" />
          <input placeholder="Email" type="email" />
          <input placeholder="Password" type="password" />
          <input placeholder="Confirm Password" type="password" />
          <input
            id="img-inp"
            style={{ display: "none" }}
            type="file"
            accept="image/jpeg, image/png, image/jpg"
          />
          <label htmlFor="img-inp" className="image-upload">
            <BsUpload className="ima-upload-icon" />
            <p>Upload Profile Picture</p>
          </label>
        </div>
        <div className="button-div">
          <button type="submit">Register</button>
          <span>
            <Link to="/login">Log in</Link> instead
          </span>
        </div>
      </div>
    </form>
  );
}

export default Signup;
