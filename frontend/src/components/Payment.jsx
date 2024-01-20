import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { all } from "axios";
const Payment = ({ bounty }) => {
  const navigate = useNavigate();
  const issueLink = bounty.issueLink;
  const issueLinkPart = issueLink.split("/");
  const owner = issueLinkPart[3];
  const repo = issueLinkPart[4];
  const issueNumber = issueLinkPart[6];
  const [issues, setIssues] = useState([]);
  async function checkIfMerged(owner, repo, issueNumber) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;

    try {
      const response = await fetch(apiUrl);
      const issueData = await response.json();
      console.log(issueData);
      if (issueData.state === "closed") {
        if (issueData.pull_request) {
          // If it's a pull request, check if it's merged
          if (issueData.merged) {
            console.log("The pull request has been merged.");
          } else {
            console.log("The pull request is closed but not merged.");
          }
        } else {
          console.log("The issue is closed.");
        }
      } else {
        console.log("The issue or pull request is still open.");
      }
    } catch (error) {
      console.error("Error fetching data from GitHub API:", error.message);
    }
  }

  return (
    <section>
      <div className="product">
        <img src="../assets/bounty.png" alt="Bounty Vector Art" />
        <div className="description">
          <h3>{bounty.title}</h3>
          <h5>${bounty.price}</h5>
        </div>
      </div>
      <button
        onClick={() => checkIfMerged(owner, repo, issueNumber)}
        className="px-3 bg-blue-700 rounded-xl text-white py-2"
      >
        Checkout
      </button>
    </section>
  );
};
export default Payment;
