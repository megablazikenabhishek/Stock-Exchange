import { Component, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { json, Link, Navigate } from "react-router-dom";
import "./style.css";
function Navbar() {
  let state = {};

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("google-user"))
  );
  function handleCallbackResponse(response) {
    // console.log(response);
    const user = jwt_decode(response.credential);
    console.log(user);
    // Navigate("/dashboard");
    localStorage.setItem("google-user", JSON.stringify(user));
    setUser(user);
    // window.href = "/dashboard";
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "817833227189-qla6tuij6sphbfbo38rd6ji2sr6806ua.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  // setUser(localStorage.getItem("google-user"));
  console.log(user);

  function removeUser() {
    localStorage.removeItem("google-user");
    setUser({});
    // Navigate("/");
    window.location.reload();
  }
  return (
    <nav className="flex-container">
      <div>
        <h1 className="title">Stocks</h1>
      </div>
      {/* <div className="small-flex">
        <form action="/registration">
          <button type="submit" className="login">
            Login
          </button>
        </form>
        <form action="/registration">
          <button type="submit" className="register">
            Register
          </button>
        </form>
      </div> */}
      {localStorage.getItem("google-user") ? (
        <div>
          <button className="register" onClick={removeUser}>
            LogOut
          </button>
          <button className="login" style={{ marginLeft: "20px" }}>
            <Link to="/dashboard">Dashboard</Link>
          </button>
        </div>
      ) : (
        ""
      )}

      {!localStorage.getItem("google-user") && <div id="signInDiv"></div>}
    </nav>
  );
}

export default Navbar;
