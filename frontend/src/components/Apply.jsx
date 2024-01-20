import React, { useState } from "react";
import Modal from "react-modal";
import Cokkie from "js-cookie";

const Apply = ({ id }) => {
  const [applicant, setApplicant] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(true);
  const accessToken = Cokkie.get("accessToken");

  function handleSubmit(e) {
    setIsModalOpen(false);
    e.preventDefault();
    fetch("http://localhost:8888/bounty/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        id,
      },
      body: JSON.stringify({ applicant }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          alert("Application sent!");
        }
      });
  }

  function handleChange(e) {
    console.log(applicant);
    setApplicant((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            overlay: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(to right, #4299e1, transparent)", // Add a gradient background
            },
            content: {
              width: "70%", // Adjust the width of the modal content
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <div className="text-center">
            <h2
              className="text-4xl font-semibold mb-4 text-purple-950
                    "
            >
              Apply to work on Bounty
            </h2>
            <input
              type="text"
              onChange={handleChange}
              name="description"
              placeholder="Explain"
              className="w-96 border m-12 border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleSubmit}
              className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-blue"
            >
              Send Application
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Apply;
