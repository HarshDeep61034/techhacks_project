import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Application from "../components/Application";
import Apply from "../components/Apply";
import Payment from "../components/Payment";

function BountyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("details");
  const accessToken = Cookies.get("accessToken");
  const [bounty, setBounty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialog, setDaialog] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:8888/bounty/get`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
        id,
      },
    })
      .then((res) => res.json())
      .then((res) => setBounty(res.data))
      .then(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {dialog ? <Apply id={id} dialog={dialog} /> : " "}

      <div className="border border-gray-300 p-4 rounded-md md:w-full mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl border-b-0 h-auto flex flex-col justify-center bg-purple-100">
        <span
          onClick={() => navigate("/home")}
          className="bg-purple-200 text-left px-4 py-2 w-52 rounded-2xl h-12 text-xl mb-4 w-lg md:mb-0 hover:bg-gray-300 cursor-pointer"
        >
          ← Back to Bounties
        </span>

        <div className="mt-4 text-center md:text-left flex justify-between">
          <h3 className="text-purple-600 font-medium p-5 mb-2 text-6xl">
            Earn @ $ {bounty.price}
          </h3>
          <p className="text-gray-100 mb-1 float-right bg-blue-500 w-28 text-center rounded-full h-12 mx-8 pt-1.5 hover:bg-blue-300 hover:text-black text-2xl cursor-pointer">
            • {bounty.status}
          </p>
        </div>
        <div>
          <h4 className="text-black p-5 text-3xl">{bounty.title}</h4>
        </div>
        <div className="flex items-center mt-2 justify-between">
          <div className="text-center md:text-left md:w-1/2">
            <span className="block  text-2xl p-5">{bounty.createdBy}</span>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setDaialog(!dialog)}
              className="bg-blue-500 text-white px-6 py-3 rounded-md text-2xl transition hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Apply
            </button>
            <a href={bounty.issueLink}>
              {" "}
              <button className="bg-blue-500 text-white px-6 py-3 rounded-md text-2xl transition hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                View Github
              </button>
            </a>
          </div>
        </div>

        <div className="mt-4 p-7">
          <h5 className="text-md flex items-center justify-center md:justify-start space-x-4 text-xl">
            <span
              onClick={() => setContent("details")}
              className="partition hover:text-gray-500 hover:underline cursor-pointer text-xl"
            >
              Details&nbsp;&nbsp;&nbsp;
            </span>{" "}
            |
            <span
              onClick={() => setContent("Application")}
              className="partition hover:text-gray-500 hover:underline cursor-pointer"
            >
              Applications&nbsp;&nbsp;&nbsp;{" "}
            </span>{" "}
            |
            <span
              onClick={() => setContent("Payment")}
              className="partition hover:text-gray-500 hover:underline cursor-pointer text-xl"
            >
              Payments
            </span>
          </h5>
        </div>

        <div className="mx-auto my-24 px-8 py-6 border border-gray-300 rounded-md">
          {content === "details" && (
            <>
              <h2 className="text-3xl font-semibold text-gray-800">
                Bounty Description
              </h2>
              <p className="text-lg text-gray-600 mt-4">{bounty.description}</p>

              <h2 className="text-3xl font-semibold text-gray-800 mt-6">
                Acceptance Criteria
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                I would like my own bot to instantly book
                clubname.clubautomation.com reservations for tennis at a
                specific day and time I am interested in. I'll provide the
                actual link when you're ready to start work!
              </p>

              <p className="text-lg text-gray-600 mt-4">
                I want to monitor when things are released (7 am) 3 days in
                advance for authenticated users and also monitor cancels for
                things that meet my criteria.
              </p>

              <p className="text-lg text-gray-600 mt-4">
                There are already some similar projects, like this Resy bot for
                restaurant reservations, with project code examples available on
                GitHub example:{" "}
                <a
                  href="https://github.com/Alkaar/resy-booking-bot"
                  className="text-blue-500 underline"
                >
                  https://github.com/Alkaar/resy-booking-bot
                </a>
              </p>
            </>
          )}
          {content === "Payment" && <Payment bounty={bounty} />}

          {content === "Application" && <Application applicants={bounty} />}
        </div>
      </div>
    </>
  );
}

export default BountyPage;
