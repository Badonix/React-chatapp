import React from "react";
import { Link } from "react-router-dom";
function Login() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="user-form">
      <div className="form-container">
        <h2>Login</h2>
        <div className="input-container">
          <input placeholder="User" autoFocus={true} type="text" />
          <input placeholder="Password" type="password" />
        </div>
        <div className="button-div">
          <button type="submit">Log in</button>
          <span>
            <Link to="/signup">Register</Link> instead
          </span>
        </div>
      </div>
    </form>
  );
}

export default Login;
