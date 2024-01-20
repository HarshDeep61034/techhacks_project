import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Login({ toggle }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  function handleChange(e) {
    console.log(user);
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async () => {
    console.log("dabba");
    console.log(user);
    // Simulate sending form data to an API endpoint
    fetch("http://localhost:8888/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.auth) {
          navigate("/home");
        } else {
          navigate("/auth");
        }
        Cookies.set("accessToken", data.accessToken, { expires: 7, path: "/" });
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around h-screen bg-purple-200">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl text-center mb-4 md:mb-0">𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝗕𝗮𝗰𝗸 !</h1>
        <img
          src="src/assets/649fe9a8d55bea363672b43f_rocket-woman-no-background.svg"
          alt=""
          className="block p-9"
        />
      </div>

      <div className="bg-purple-200 p-8 rounded w-96 md:ml-8 md:mr-8 md:flex-col">
        <input
          type="text"
          onChange={handleChange}
          name="email"
          placeholder="Enter your email"
          className="w-full border p-4 rounded-xl focus:outline-none focus:border-purple-500 bg-slate-50 bg-opacity-50 mb-7 size-16"
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Enter your password"
          className="w-full border p-4 rounded-xl focus:outline-none focus:border-purple-500 bg-slate-50 bg-opacity-50 size-16"
        />
        <button
          onClick={handleSubmit}
          className="bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple text-xl mt-7 size mx-28"
        >
          Login
        </button>
        <div className="text-black ml-24 mt-4 cursor-pointer " onClick={toggle} >Create an account</div>
      </div>
    </div>
  );
}
