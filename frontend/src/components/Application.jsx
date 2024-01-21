import React, { useEffect } from "react";

const Application = ({ applicants, approval }) => {
  const AppliArray = applicants.Applications;
  if (AppliArray.length === 0) return <p>No Applications yet</p>;
  else {
    return (
      <>
        <div className="bg-purple-100 p-8">
          <h1 className="text-4xl font-bold mb-6">Applicants: </h1>
          {AppliArray.map((state, index) => (
            <div key={index} className="bg-white shadow-md p-6 mb-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">{state.user}</h2>
              <h3 className="text-gray-600">{state.description}</h3>

              <button
                onClick={() => alert("Accepted User as Bounty Hunter")}
                className="px-3 py-2 bg-green-600 text-white rounded-xl"
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Application;
