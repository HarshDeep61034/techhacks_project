import React, { useState, useEffect } from "react";
import BountyComponent from "../components/BountyComponent";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
const Home = () => {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await fetch("http://localhost:8888/bounty/data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bounties");
        }

        const dt = await response.json();
        // Assuming 'bounties' is the key containing the array in the response
        setBounties(dt.data || []); // Set to an empty array if 'bounties' is undefined
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBounties();
  }, [accessToken]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && bounties.length > 0 && (
          <>
            {bounties.map((bounty) => (
              <BountyComponent
                id={bounty.id}
                key={bounty._id} // Assuming you have an _id field for each bounty
                title={bounty.title}
                price={bounty.price}
                description={bounty.description}
                status={bounty.status}
                createdBy={bounty.createdBy}
                approval={false}
              />
            ))}
          </>
        )}
        {!loading && !error && bounties.length === 0 && (
          <p>No bounties available.</p>
        )}
      </div>
    </>
  );
};

export default Home;
