import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Signup({ toggle }) {
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
    // Simulate sending form data to an API endpoint
    fetch("http://localhost:8888/user/register", {
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
        <h1 className="text-5xl text-center m-10 sm:mb-0 rounded-2xl">
          𝗚𝗲𝘁 𝗦𝘁𝗮𝗿𝘁𝗲𝗱
        </h1>
        <img
          src="src/assets/649fe9a8d55bea363672b43f_rocket-woman-no-background.svg"
          alt=""
          className="block p-9"
        />
      </div>

      <div className="bg-purple-200 p-8 rounded w-96 md:ml-8 md:mr-8 sm:flex-row">
        <div className="mb-4">
          <input
            placeholder="Username"
            type="text"
            name="name"
            id="username"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl focus:outline-none focus:border-purple-500 bg-slate-50 bg-opacity-50"
          />
        </div>

        <div className="mb-4">
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl focus:outline-none focus:border-purple-500 bg-slate-50 bg-opacity-50"
          />
        </div>

        <div className="mb-4">
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl focus:outline-none focus:border-purple-500 bg-slate-50 bg-opacity-50"
          />
        </div>

        <div className="mb-4">
          <input
            placeholder="Enter Github Url"
            type="text"
            name="github"
            id="github"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl focus:outline-none focus:border-purple-500 bg-slate-50 bg-opacity-50"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-purple-500 text-white py-4 mt-4 px-8 rounded-full hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple text-xl mx-auto block"
        >
          Submit
        </button>
        <div className="text-black ml-20 mt-4 cursor-pointer hover:underline " onClick={toggle} >Already have an account?</div>
      </div>
    </div>
  );
}
