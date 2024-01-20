import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import React from "react";
const Auth = () => {
  const [authState, setAuthState] = useState("login");
  function toggleAuthState() {
    setAuthState(authState === "login" ? "signup" : "login");
  }
  return (
    <div>
      {/* <button className="border-2 p-2 rounded-lg" onClick={toggleAuthState}>
        Switch to {authState === "login" ? "Signup" : "Login"}
      </button> */}
      {authState === "login" ? <Login toggle={toggleAuthState} /> : <Signup toggle={toggleAuthState} />}
    </div>
  );
};

export default Auth;
