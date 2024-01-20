import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="p-3 bg-white-50 shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-[Poppins] cursor-pointer">
            <img
              className="h-8 text-7xl mx-16 inline"
              src="https://tailwindcss.com/_next/static/media/social-square.b622e290e82093c36cca57092ffe494f.jpg"
              alt=""
            />
            CoinCode
          </span>
          <span className="text-4xl cursor-pointer mx-4 md:hidden block">
            <ion-icon name="menu" onClick={toggleMenu} />
          </span>
        </div>
        <ul
          className={
            "md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-2 md:pl-0 pl-4 md:opacity-100 ${isMenuOpen ? 'opacity-100 top-0' : 'opacity-0 top-[-400px]'} overflow-y-auto max-h-[300px] transition-all ease-in duration-500"
          }
        >
          <li className="mx-2 my-4 md:my-0">
            <span
              onClick={() => navigate("/Dashboard")}
              className="text-xl cursor-pointer duration-100 transition-colors hover:text-purple-500 hover:bg-gray-200 py-1 px-2 rounded-md"
            >
              Dashboard
            </span>
          </li>
          <li className="mx-2 my-4 md:my-0">
            <span
              onClick={() => navigate("/home")}
              className="text-xl cursor-pointer duration-100 transition-colors hover:text-purple-500 hover:bg-gray-200 py-1 px-2 rounded-md"
            >
              Home
            </span>
          </li>
          <button
            onClick={() => navigate("/bountyCreate")}
            className="bg-purple-900 text-white font-[Poppins] duration-100 px-4 h-9 py-1 mx-2 hover:bg-purple-400 rounded"
          >
            Add Bounty!
          </button>
          <h2 className="" />
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
