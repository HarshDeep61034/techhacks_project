import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import BountyComponent from "../components/BountyComponent";
import Cookies from "js-cookie";
function Dashboard() {
  const [user, setUser] = useState([]);
  const [bounties, setBounties] = useState([]);
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    //user data fetch
    fetch(`http://localhost:8888/bounty/get/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBounties(data.data);
      });
  }, []);

  useEffect(() => {
    //user data fetch
    fetch(`http://localhost:8888/user/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row mt-16 justify-center items-center bg-purple-200 rounded-3xl">
        <div className="md:w-1/4 p-4 bg-purple-100 rounded-3xl mx-8 ">
          <div className="bg-purple-50 h-64 shadow-md rounded-3xl p-4 text-center">
            <img
              className="h-24 w-24 transform hover:scale-125 transition-transform duration-400 ease-in-out animate-fadeIn animate-delay-${index} outline-none rounded-full mx-auto mb-2"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
            />
            <h1 className="text-3xl text-purple-900 font-bold mb-2 transform hover:scale-125 transition-transform duration-400 ease-in-out animate-fadeIn animate-delay-${index} cursor-pointer">
              {user.name || "Name"}
            </h1>
            <p className="text-lg text-purple-600 mb-2 transform hover:scale-125 transition-transform duration-400 ease-in-out animate-fadeIn animate-delay-${index} cursor-pointer overflow-hidden">
              Email: {user.email || "Email"}
            </p>
          </div>
        </div>
        <div className="md:w-3/4 p-4 rounded-3xl">
          <div className="bg-white shadow-md rounded-3xl p-4">
            {bounties.map((bounty, index) => (
              <BountyComponent
                key={index}
                id={bounty.id}
                title={bounty.title}
                description={bounty.description}
                status={bounty.status}
                createdBy={bounty.createdBy}
                price={bounty.price}
                approval={true}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
